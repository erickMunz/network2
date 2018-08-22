#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <netinet/ip.h>
#include "../tftp.h"

int main(int argc, char const *argv[]){

	struct sockaddr_in local;
    struct sockaddr_in remota;
    int udp_socket = socket(AF_INET, SOCK_DGRAM, 0); 
    if(udp_socket == -1){
        perror("Error al abrir el socket\n");
    }else{
    	printf("Exito al abrir el socket\n");
    	
    	memset(&local, 0x00, sizeof(local));
    	
    	local.sin_family = AF_INET; 
        local.sin_port = htons(0); 
        local.sin_addr.s_addr = INADDR_ANY;

        int lbind = bind(udp_socket, (struct sockaddr*)&local, sizeof(local));
        if(lbind == -1){
            perror("Error en bind\n");
        }else{
        	printf("Exito en bind\n");
            memset(&remota, 0x00, sizeof(remota));

            remota.sin_family = AF_INET; 
            remota.sin_port = htons(69);

            inet_aton((argc > 1?argv[1]:"8.12.0.166"), &remota.sin_addr); 
            socklen_t szremota = (unsigned int)sizeof(remota);

            unsigned short opc = 1;
            while(opc){
            	printf("1. Leer\n2. Escribir \n0. Salir\n ");
            	scanf("%hu", &opc);
            	unsigned char buffer[1024];
            	if(opc == 1){
            		RRQ rrq;
            		rrq.file_name = (char *) malloc(sizeof(char)*STR_MAX);
            		rrq.mode = (char *) malloc(sizeof(char)*STR_MAX);
            		rrq.mode = "octet";
            		printf("Nombre del archivo: ");
            		scanf("%s", rrq.file_name);
            		int tam = fillRRQBuffer(buffer, rrq);
            		tam = sendto(udp_socket, buffer, tam, 0, (struct sockaddr*)&remota, szremota);
            		if(tam == -1){
            			printf("Error al enviar RRQ\n");
            		}else{
            			printf("Exito al enviar RRQ\n");
            			tam = recvfrom(udp_socket, buffer, 516, 0, (struct sockaddr*)&remota, &szremota);

            			if(tam == -1){
            				printf("Error al recibir \n");
            			}else{
            				printf("Exito al recibir \n");
            				unsigned short opt_code = getOptCode(buffer);
            				if(opt_code == 5){
            					printError(buffer);
            				}else if(opt_code == 3){
            					FILE *f;
            					ACK ack;
            					DATA data;
            					f = fopen(rrq.file_name, "wb+");
            					while(tam - 4 >= DATA_MAX){
                                    data = fillDATA(buffer);
                                    if(tam == -1){
                                        printf("Error al recibir bloque %hu\n", data.block_n);
                                    }else{
                                        printf("Exito al recibir bloque %hu\n", data.block_n);
                                    }
            						fwrite(buffer+4 ,1, DATA_MAX, f);
            						printf("Bloque %hu escrito\n", data.block_n);
            						printf("Tamanio bloque %d\n", tam - 4);
            						ack.block_n = data.block_n;
            						tam = fillACKBuffer(buffer, ack);
            						tam = sendto(udp_socket, buffer, tam, 0, (struct sockaddr*)&remota, szremota);
            						if(tam == -1){
            							printf("Error al enviar ACK %hu\n", ack.block_n);
            						}else{
            							printf("Exito al enviar ACK %hu\n", ack.block_n);
            						}

            						tam = recvfrom(udp_socket, buffer, 516, 0, (struct sockaddr*)&remota, &szremota);           						
            					}
            					data = fillDATA(buffer);
                                if(tam == -1){
                                    printf("Error al recibir bloque %hu\n", data.block_n);
                                }else{
                                    printf("Exito al recibir bloque %hu\n", data.block_n);
                                }
                                fwrite(buffer+4 ,1, tam - 4, f);
                                printf("Bloque %hu escrito\n", data.block_n);
                                printf("Tamanio bloque %d\n", tam - 4);
                                ack.block_n = data.block_n;
                                tam = fillACKBuffer(buffer, ack);
                                tam = sendto(udp_socket, buffer, tam, 0, (struct sockaddr*)&remota, szremota);

                                fclose(f);


            				}

            			}

            		}
            	}else if(opc == 2){

            		WRQ wrq;
            		wrq.file_name = (char *) malloc(sizeof(char)*STR_MAX);
            		wrq.mode = (char *) malloc(sizeof(char)*STR_MAX);
            		wrq.mode = "octet";
            		printf("Nombre del archivo: ");
            		scanf("%s", wrq.file_name);
            		int tam = fillWRQBuffer(buffer, wrq);
            		tam = sendto(udp_socket, buffer, tam, 0, (struct sockaddr*)&remota, szremota);
            		if(tam == -1){
            			printf("Error al enviar WRQ\n");
            		}else{
            			printf("Exito al enviar WRQ\n");
            			tam = recvfrom(udp_socket, buffer, 516, 0, (struct sockaddr*)&remota, &szremota);

            			if(tam == -1){
            				printf("Error al recibir \n");
            			}else{
            				printf("Exito al recibir \n");
            				unsigned short opt_code = getOptCode(buffer);
            				if(opt_code == 5){
            					printError(buffer);
            				}else{
            					ACK ack;
                                DATA data;
            					ack = fillACK(buffer);
            					printf("Exito al recibir ACK %hu\n", ack.block_n);
            					FILE *f;
            					f = fopen(wrq.file_name, "rb");
            					size_t bytesread = 0;
                                data.block_n = 1;
                                bytesread = fread(data.data, 1, DATA_MAX, f);
            					while(bytesread  > 0){
                                    fillDATABuffer(buffer, data);
            						tam = sendto(udp_socket, buffer, bytesread+4, 0, (struct sockaddr*)&remota, szremota);
            						if(tam == -1){
            							printf("Error al enviar DATA %hu\n", data.block_n);
            						}else{
            							printf("Exito al enviar DATA %hu\n", data.block_n);
            						}

            						tam = recvfrom(udp_socket, buffer, 516, 0, (struct sockaddr*)&remota, &szremota);
                                    ack = fillACK(buffer);
            						if (tam == -1){
            							printf("Error al recibir ACK %hu\n", ack.block_n);
            						}else{
            							printf("Exito al recibir ACK %hu\n", ack.block_n);
            						}
                                    bytesread = fread(data.data, 1, DATA_MAX, f);
                                    data.block_n++;
            					}
                                fclose(f);
                                

            				}

            			}

            		}

            	}

            }


        }

    }


	return 0;
}