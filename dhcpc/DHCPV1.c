#include <sys/types.h>
#include <sys/time.h>
#include <sys/socket.h>
#include <stdio.h>
#include <stdlib.h>
#include <netinet/in.h>
#include <netdb.h>
#include <string.h>
#include <netinet/ip.h>
#include <arpa/inet.h>
#include <unistd.h>
#define TAM 5

void imprimeTrama(unsigned char *paq, int len){
	//int tram[16];
	for(int i = 0; i < len; i++){
		if((i%16) == 0){
			printf("\n");
		}
		printf("%.2x ", paq[i]);
	}
	printf("\n");
}
void imprimeTramaDecimal(unsigned char *paq, int len){
	//int tram[16];
	for(int i = 0; i < len; i++){
		if((i%16) == 0){
			printf("\n");
		}
		printf("%d ", (int) paq[i]);
	}
	printf("\n");
}
void formatoACK(unsigned char *paq,char *ip){
	printf("Vamos a asignar una ip ACK \n %s \n",ip);
	char *cacho = strtok(ip,".");
	int i = 0;
	while(cacho!=NULL){
		paq[16+i] = atoi(cacho);
		cacho = strtok (NULL, ".");		
		i++;
	}
	paq[0] = 2;
	paq[8] = 0;
	paq[9] = 0;
	/*
	paq[16] = 192;
	paq[17] = 168;
	paq[18] = 1;
	paq[19] = 10;
	*/
	paq[20] = 192;
	paq[21] = 168;
	paq[22] = 1;
	paq[23] = 64;

	paq[24] = 192;
	paq[25] = 168;
	paq[26] = 1;
	paq[27] = 1;

	paq[236] = 99;
	paq[237] = 130;
	paq[238] = 83;
	paq[239] = 99;

	paq[240] = 53;
	paq[241] = 1;
	paq[242] = 5;
	//OPTION TIME
	paq[243] = 51;
	paq[244] = 4;
	paq[245] = 0;
	paq[246] = 0;
	paq[247] = 0;
	paq[248] = 60;
	//OPCION SUBNET MASK
	paq[249] = 1;
	paq[250] = 4;
	paq[251] = 0xff;
	paq[252] = 0xff;
	paq[253] = 0xff;
	paq[254] = 0;
	//OPTION ROUTER
	paq[255] = 3;
	paq[256] = 4;
	paq[257] = 192;
	paq[258] = 168;
	paq[259] = 1;
	paq[260] = 1;
	//OPTION DNS
	paq[261] = 6;
	paq[262] = 4;
	paq[263] = 148;
	paq[264] = 204;
	paq[265] = 103;
	paq[266] = 2;
	//OPT BROADCAST
	paq[267] = 28;
	paq[268] = 4;
	paq[269] = 192;
	paq[270] = 168;
	paq[271] = 1;
	paq[272] = 255;
	//OPT BROADCAST
	paq[273] = 0x36;
	paq[274] = 4;
	paq[275] = 192;
	paq[276] = 168;
	paq[277] = 1;
	paq[278] = 100;

	paq[279] = 0xff;
}
int ipPedida(char* p){
	printf("%d  %d",p[252],p[253]);
	if(p[252]==50&& p[253]==4){
		return 1;
	}
	return 0;
}
void formatoIP(char *ip, char *cacho,int num){
	sprintf(ip,"%s.%d",cacho,10+num);
}
int dhcp(unsigned char *paq){

	if(paq[240]==53&&paq[241]==1&&paq[242]==3){
		return 3;
	}
	if(paq[240]==53&&paq[241]==1&&paq[242]==2){
        return 2;
    }
    if(paq[240]==53&&paq[241]==1&&paq[242]==1){
        return 1;
    }
    if(paq[240]==53&&paq[241]==1&&paq[242]==5){
        return 5;
    }
    return 0;
        
}
void mac(unsigned char *paq){
    int i=0;
    for(i=0;i<7;i++){
        printf("%.2x", paq[245+i]);
        
    }
}
void formatoOffer (unsigned char *paq, char *ip){
				printf("Vamos a asignar una ip \n %s \n",ip);
				char *cacho = strtok(ip,".");
				int i = 0;
				while(cacho!=NULL){
					paq[16+i] = atoi(cacho);
					cacho = strtok (NULL, ".");
					i++;
				}
				paq[0] = 2;
		    	paq[8] = 0;
				paq[9] = 0;	
				//ip_ofertada
				/*
				paq[16] = (int) cacho;
				paq[17] = (int) cacho;
				paq[18] = (int) cacho;
				paq[19] = (int) cacho;*/

				paq[20] = 192;
				paq[21] = 168;
				paq[22] = 1;
				paq[23] = 64;

				paq[24] = 192;
				paq[25] = 168;
				paq[26] = 1;
				paq[27] = 1;

				paq[236] = 99;
				paq[237] = 130;
				paq[238] = 83;
				paq[239] = 99;
				//OPTION DHCPOFFER
				paq[240] = 53;
				paq[241] = 1;
				paq[242] = 2;
				//OPCION SUBNET MASK
				paq[243] = 1;
				paq[244] = 4;
				paq[245] = 0xff;
				paq[246] = 0xff;
				paq[247] = 0xff;
				paq[248] = 0;
				//OPTION ROUTER
				paq[249] = 3;
				paq[250] = 4;
				paq[251] = 192;
				paq[252] = 168;
				paq[253] = 1;
				paq[254] = 1;
				//OPTION DNS
				paq[255] = 6;
				paq[256] = 4;
				paq[257] = 148;
				paq[258] = 204;
				paq[259] = 103;
				paq[260] = 2;
				//OPT BROADCAST
				paq[261] = 28;
				paq[262] = 4;
				paq[263] = 192;
				paq[264] = 168;
				paq[265] = 1;
				paq[266] = 255;
				//OPTION ID SERVIDOR
				paq[267] = 0x36;
				paq[268] = 4;
				paq[269] = 192;
				paq[270] = 168;
				paq[271] = 1;
				paq[272] = 100;

				paq[273] = 0xff;
}
int esRequest(unsigned char *paq){
	if(paq[240]==53&&paq[241]==1&&paq[242]==3){
		return 1;
	}
	else{
		return 0;
	}
}
void guardarIP(unsigned char *lease, unsigned char *paq){
    int i = 0;
	for (i=0;i<7;i++)
	{
		lease[i]=paq[245+i];
	}
}

int buscarMac(unsigned char *lease, unsigned char *paq){
	int i = 0;
	for(i=0;i<7;i++){
		if(lease[i]!=paq[245+i]){
			return 0;
		}
	}
	return 1;
}
int main(int argc, char const *argv[]){
    unsigned char dhcp_discover[361], dhcp_offer[274], dhcp_ack[280], opc_ack[1] = {0x03}, lease[TAM][8];
	int veces = 0;
    //recuerda agregar la mac al lease y despues validar en el request si es que ya le habias asignado algo a ese dispositivo
    int ds, ds2, tamrecv, tamsend, on = 1;
    socklen_t clilen, serverlen;
    struct sockaddr_in server_addr, client_addr;
   
    ds  = socket(AF_INET, SOCK_DGRAM, 0);

    if((setsockopt(ds, SOL_SOCKET, SO_BROADCAST, &on, sizeof(on))) < 0){
    	perror("\nsetsockopt");
    }

	server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_BROADCAST;
    server_addr.sin_port = htons(68);

    client_addr.sin_family = AF_INET;
    client_addr.sin_addr.s_addr = INADDR_ANY;
    client_addr.sin_port = htons(67);
    if((bind(ds, (struct sockaddr *)&client_addr,sizeof(client_addr))) < 0){
    	perror("\nError en Bind Cliente ");
    }else{
    	printf("Exito en Bind Cliente\n");
		clilen = sizeof(client_addr);
	    while(1){
	    	tamrecv = recvfrom(ds, dhcp_discover, sizeof(dhcp_discover), 0, (struct sockaddr *)&client_addr, &clilen);
		    if(tamrecv < 0){
		    		perror("No envia DHCPDISCOVER");
			}else{
				printf("Exito al recibir DHCPDISCOVER\n");
				int i = 0, encontrado= 0;
				if(esRequest(dhcp_discover)){
					printf("es request \n");
					
								for (i=0;i<veces;i++){
									if(buscarMac(lease[i],dhcp_discover)){
										encontrado = 1;
									}
								}
									if(encontrado){
										
										printf("Es Iguaaaal \n");
										if(ipPedida(dhcp_discover)){
											printf("ip pedida \n");
											memcpy(dhcp_ack, dhcp_discover, 235);
											char ip2[50];				
											sprintf(ip2,"192.168.%d.%d",dhcp_discover[256],dhcp_discover[257]);
											formatoACK(dhcp_ack,ip2);
											if(!memcmp(dhcp_discover+242, opc_ack, 1)){
											tamsend = sendto(ds, dhcp_ack, 280, 0, (struct sockaddr *)&server_addr, clilen);
																if(tamsend < 0){
																	perror("\nError al enviar DHCPACK");
																}else{
																	printf("Exito al enviar DHCPACK\n");
																}
											}
										}
											
									}
									else{
											memcpy(dhcp_ack, dhcp_discover, 235);

											ipPedida(dhcp_discover);
											char ip2[50];
											sprintf(ip2,"192.168.1.%d",10+veces);
											
											formatoACK(dhcp_ack,ip2);
											if(!memcmp(dhcp_discover+242, opc_ack, 1)){
												tamsend = sendto(ds, dhcp_ack, 280, 0, (struct sockaddr *)&server_addr, clilen);
												if(tamsend < 0){
													perror("\nError al enviar DHCPACK");
												}else{
													printf("Exito al enviar DHCPACK\n");
												}
											}
									}

				}
				printf("no es request");
				for (i=0;i<veces;i++){
									if(buscarMac(lease[i],dhcp_discover)){
										encontrado = 1;
									}
								}
									if(encontrado){
										//Verificar escenario
										printf("Es Iguaaaal 2\n");
										if(ipPedida(dhcp_discover)){
											printf("ip pedida \n");
											memcpy(dhcp_ack, dhcp_discover, 235);
											char ip2[50];				
											sprintf(ip2,"192.168.%d.%d",dhcp_discover[256],dhcp_discover[257]);
											formatoACK(dhcp_ack,ip2);
											if(!memcmp(dhcp_discover+242, opc_ack, 1)){
											tamsend = sendto(ds, dhcp_ack, 280, 0, (struct sockaddr *)&server_addr, clilen);
																if(tamsend < 0){
																	perror("\nError al enviar DHCPACK");
																}else{
																	printf("Exito al enviar DHCPACK\n");
																}
											}
										}
											
									}
									else{
											memcpy(dhcp_offer, dhcp_discover, 160);
				char ip[50];
				sprintf(ip,"192.168.1.%d",10+veces);
				formatoOffer(dhcp_offer,ip);
				tamsend = sendto(ds, dhcp_offer, 274, 0, (struct sockaddr *)&server_addr, clilen);
				if(tamsend < 0){
		    		perror("\nError en sendto");
		    	}else{
		    		printf("Exito al enviar DHCPOFFER\n");
				
		    		//Request
    				tamrecv = recvfrom(ds, dhcp_discover, sizeof(dhcp_discover), 0, (struct sockaddr *)&client_addr, &clilen);
    				if(tamrecv < 0){
    					perror("\nError al recibir DHCPREQUEST");
    				}else{
    					printf("Exito al recibir DHCPREQUEST\n");
						if(veces==0){
							printf("primera vez \n");
							guardarIP(lease[veces],dhcp_discover);
							ipPedida(dhcp_discover);
							memcpy(dhcp_ack, dhcp_discover, 235);
							char ip2[50];
							sprintf(ip2,"192.168.1.%d",10+veces);
							formatoACK(dhcp_ack,ip2);
							if(!memcmp(dhcp_discover+242, opc_ack, 1)){
							tamsend = sendto(ds, dhcp_ack, 280, 0, (struct sockaddr *)&server_addr, clilen);
												if(tamsend < 0){
													perror("\nError al enviar DHCPACK");
												}else{
													printf("Exito al enviar DHCPACK\n");
												}
							}
											
						}else{
										if(veces < TAM){
											int i = 0, encontrado= 0;
											for (i=0;i<veces;i++){
												if(buscarMac(lease[i],dhcp_discover)){
													encontrado = 1;
												}
											}
												if(encontrado){
													printf("Es Iguaaaal 3\n");
														//ACK
														if(ipPedida(dhcp_discover)){
														printf("ip pedida 2\n");
														memcpy(dhcp_ack, dhcp_discover, 235);
														char ip2[50];				
														sprintf(ip2,"192.168.%d.%d",dhcp_discover[256],dhcp_discover[257]);
														formatoACK(dhcp_ack,ip2);
														if(!memcmp(dhcp_discover+242, opc_ack, 1)){
															tamsend = sendto(ds, dhcp_ack, 280, 0, (struct sockaddr *)&server_addr, clilen);
															if(tamsend < 0){
																perror("\nError al enviar DHCPACK");
															}else{
																printf("Exito al enviar DHCPACK\n");
															}
														}
													}
												}
												else{
														memcpy(dhcp_ack, dhcp_discover, 235);
														char ip2[50];
														sprintf(ip2,"192.168.1.%d",10+veces);
														formatoACK(dhcp_ack,ip2);
														if(!memcmp(dhcp_discover+242, opc_ack, 1)){
															tamsend = sendto(ds, dhcp_ack, 280, 0, (struct sockaddr *)&server_addr, clilen);
															if(tamsend < 0){
																perror("\nError al enviar DHCPACK");
															}else{
																printf("Exito al enviar DHCPACK\n");
															}
														}
												}
											
										}
										else{
											printf("ya no podemos asignar mas direcciones \n");
										}
									}
								}
							}
						}

				veces++;
			}
			
		}
	}
	close(ds);
    return 0;
}