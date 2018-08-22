#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <netinet/ip.h>
#include "../tftp.h"

int main(int argc, char const *argv[])
{
	struct sockaddr_in cliente;
	struct sockaddr_in servidor;
    int udp_socket = socket(AF_INET, SOCK_DGRAM, 0);
    if(udp_socket == -1){
        perror("Error al abrir el socket\n");
    }else{
        memset(&servidor, 0x00, sizeof(servidor)); //Setea la estructura
        printf("Exito al abrir el socket\n");

        servidor.sin_family = AF_INET; //Asigna la familia
        servidor.sin_port = htons(69); //Se asigna un puerto al azar por htons(0)
        servidor.sin_addr.s_addr = INADDR_ANY; //Se asigna la direccion ip actual de la tarjeta de red por el INADDR_ANY

        int lbind = bind(udp_socket, (struct sockaddr*)&servidor, sizeof(servidor)); //Llamada a bind()
        
        if(lbind == -1){
            perror("Error en bind\n");
        }else{
        	printf("Exito en bind\n");
        	while(1){
        		unsigned int tam, len = (unsigned int)sizeof(cliente);
        		unsigned char buffer[1024];
            	cliente.sin_family = AF_INET;
            	cliente.sin_port = htons(0);
            	//inet_aton("127.0.0.1", &cliente.sin_addr);
            	if((tam = recvfrom(udp_socket, buffer, 1024, 0, (struct sockaddr*)&cliente, &len)) == -1){
            		perror("Error al recibir\n");
                }else{
                	printf("Exito al recibir\n");

                	unsigned short opt_code = getOptCode(buffer);

                	if(opt_code == 1){ // RRQ----------------
                		RRQ rrq;
                		rrq = fillRRQ(buffer);

                		FILE *f;

                		f = fopen(rrq.file_name, "rb");

                		if(f == NULL){
                			ERROR error;
                			error.error_code = 1;
                			error.error_msg = "File not found.";
                			tam = fillERRORBuffer(buffer, error);
                			tam = sendto(udp_socket, buffer,tam, 0, (struct sockaddr*)&cliente, len);
                			if(tam == -1){
                				printf("Error al enviar error\n");
                			}else{
                				printf("Exito al enviar error\n");
                			}
                		}else{

                			ACK ack;
            				size_t bytesread = 0;
            				unsigned int block_n = 1;
            				DATA data;
            				data.block_n = 1;
            				bytesread = fread(data.data, 1, DATA_MAX, f);
            				while(bytesread > 0){
            					fillDATABuffer(buffer, data);
            					tam = sendto(udp_socket, buffer, bytesread+4, 0, (struct sockaddr*)&cliente, len);            					if(tam == -1){
            						printf("Error al enviar DATA %hu\n", data.block_n);
            					}else{
            						printf("Exito al enviar DATA %hu\n", data.block_n);
            					}

            					tam = recvfrom(udp_socket, buffer, 516, 0, (struct sockaddr*)&cliente, &len);
            					ack = fillACK(buffer);
            					if (tam == -1){
            						printf("Error al recibir nuevo ACK\n");
            					}else{
            						printf("Exito al recibir nuevo ACK %hu\n", ack.block_n);
            						if(ack.block_n == data.block_n){
            							printf("ACK == DATA\n");
            						}else{
            							printf("ACK != DATA\n");
            						}
            					}
            					bytesread = fread(data.data, 1, DATA_MAX, f);
            					data.block_n++;

            				}
            				fclose(f);


                		}


                	}else if(opt_code == 2){ //WRQ-------------
                		WRQ wrq;
                		wrq = fillWRQ(buffer);

                		FILE *f;
                		f = fopen(wrq.file_name, "wb+");

                		ACK ack;
                		DATA data;

                		ack.block_n = 0;
                		tam = fillACKBuffer(buffer, ack);
                		tam = sendto(udp_socket, buffer, tam, 0, (struct sockaddr*)&cliente, len);
                		if(tam == -1){
                			printf("Error al enviar ACK %hu\n", ack.block_n);
                		}else{
                			printf("Exito al enviar ACK %hu\n", ack.block_n);
                		}

                		tam = recvfrom(udp_socket, buffer, 516, 0, (struct sockaddr*)&cliente, &len);
                		while(tam - 4 >= DATA_MAX){
                			data = fillDATA(buffer);
                			if(tam == -1){
            					printf("Error al recibir bloque %hu\n", data.block_n);
            				}else{
            					printf("Exito al recibir bloque  %hu\n", data.block_n);
            				}
                			fwrite(buffer+4 ,1, DATA_MAX, f);
            				printf("Bloque %hu escrito\n", data.block_n);
            				printf("Tamanio bloque %d\n", tam - 4);
            				ack.block_n = data.block_n;
            				tam = fillACKBuffer(buffer, ack);
            				tam = sendto(udp_socket, buffer, tam, 0, (struct sockaddr*)&cliente,len);
            				if(tam == -1){
            					printf("Error al enviar ACK %hu\n", ack.block_n);
            				}else{
            					printf("Exito al enviar ACK %hu\n", ack.block_n);
            				}

            				tam = recvfrom(udp_socket, buffer, 516, 0, (struct sockaddr*)&cliente, &len);
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
            			tam = sendto(udp_socket, buffer, tam, 0, (struct sockaddr*)&cliente,len);

            			fclose(f);

                	}

                }
        	}
        	
       	}
    }
	return 0;
}