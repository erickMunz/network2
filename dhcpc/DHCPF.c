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
#define TAM 2

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
void formatoACK(unsigned char *paq, char *ip1, char *sub1, char *enlace1, char *dns1){
	printf("ACK \n");
                char ip[50], sub[50], enlace[50], dns [50];
                strcpy(ip,ip1);
                strcpy(sub,sub1);
                strcpy(enlace,enlace1);
                strcpy(dns,dns1);
				printf("Vamos a asignar una ip \n %s \n",ip);
				char *tip = strtok(ip,".");
				int i = 0, j = 0, k = 0, z = 0;
				while(tip!=NULL){
					paq[16+i] = atoi(tip);
					tip = strtok (NULL, ".");
					i++;
				}
				char *tsub = strtok(sub,".");
                while(tsub!=NULL){
					paq[251+j] = atoi(tsub);
					tsub = strtok (NULL, ".");
					j++;
				}
				char *tenl = strtok(enlace,".");
                while(tenl!=NULL){
					paq[257+k] = atoi(tenl);
					tenl = strtok (NULL, ".");
					k++;
				}
				char *tdns = strtok(dns,".");
                while(tdns!=NULL){
					paq[263+z] = atoi(tdns);
					tdns = strtok (NULL, ".");
					z++;
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
    /*
	paq[251] = 0xff;
	paq[252] = 0xff;
	paq[253] = 0xff;
	paq[254] = 0;*/
	//OPTION ROUTER
	paq[255] = 3;
	paq[256] = 4;
    /*
	paq[257] = 192;
	paq[258] = 168;
	paq[259] = 1;
	paq[260] = 1;*/
	//OPTION DNS
	paq[261] = 6;
	paq[262] = 4;/*
	paq[263] = 148;
	paq[264] = 204;
	paq[265] = 103;
	paq[266] = 2;*/
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
void formatoOffer (unsigned char *paq, char *ip1, char *sub1, char *enlace1, char *dns1){
                char ip[50], sub[50], enlace[50], dns [50];
                 strcpy(ip,ip1);
                strcpy(sub,sub1);
                strcpy(enlace,enlace1);
                strcpy(dns,dns1);
			
				char *tip = strtok(ip,".");
				int i = 0, j = 0, k = 0, z = 0;
				while(tip!=NULL){
					paq[16+i] = atoi(tip);
					tip = strtok (NULL, ".");
					i++;
				}
				char *tsub = strtok(sub,".");
                while(tsub!=NULL){
					paq[245+j] = atoi(tsub);
					tsub = strtok (NULL, ".");
					j++;
				}
				char *tenl = strtok(enlace,".");
                while(tenl!=NULL){
					paq[251+k] = atoi(tenl);
					tenl = strtok (NULL, ".");
					k++;
				}
				char *tdns = strtok(dns,".");
                while(tdns!=NULL){
					paq[257+z] = atoi(tdns);
					tdns = strtok (NULL, ".");
					z++;
				}
				paq[0] = 2;
		    	paq[8] = 0;
				paq[9] = 0;	
				//ip_ofertada

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
                /*
				paq[245] = 0xff;
				paq[246] = 0xff;
				paq[247] = 0xff;*/
				paq[248] = 0;
				//OPTION ROUTER
				paq[249] = 3;
				paq[250] = 4;
                /*
				paq[251] = 192;
				paq[252] = 168;
				paq[253] = 1;
				paq[254] = 1;*/
				//OPTION DNS
				paq[255] = 6;
				paq[256] = 4;
                /*
				paq[257] = 148;
				paq[258] = 204;
				paq[259] = 103;
				paq[260] = 2;*/
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
void guardarMAC(unsigned char *lease, unsigned char *paq){
    int i = 0;
	for (i=0;i<7;i++)
	{
		lease[i]=paq[245+i];
	}
}
int ipValida(char *ip)
{
    struct sockaddr_in sa;
    return inet_pton(AF_INET, ip, &(sa.sin_addr));
}

void guardarIP(unsigned char *lease, unsigned char *paq){
	int i = 0;
	for(i=0;i<3;i++){
		lease[i]=paq[16+i];
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
    //inicializacion de las tramas a enviar
    unsigned char dhcp_discover[361], dhcp_offer[274], dhcp_ack[280], opc_ack[1] = {0x03};
	// Auxiliar para llevar control de lo que hemos declarado
    int veces = 0;
	char ips[5][50],subdir[5][50],enlace[5][50],DNS[5][50];
    //recuerda agregar la mac al lease y despues validar en el request si es que ya le habias asignado algo a ese dispositivo
    int ds, ds2, tamrecv, tamsend, on = 1;
    socklen_t clilen, serverlen;
	//int TAM;
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
    int aux = 0;
    for (aux = 0; aux < TAM ; aux++){
        printf("Escribe la %d ip que asignare \n",aux+1);
        scanf("%s",ips[aux]);
        while(!ipValida(ips[aux])){
            printf("Escribe la %d ip que asignare \n",aux+1);
            scanf("%s",ips[aux]);
        }
        printf("Escribe la %d mascara de subred  que asignare \n",aux+1);
        scanf("%s",subdir[aux]);
        while(!ipValida(subdir[aux])){
            printf("Error la ip no es valida, vuelve a intentarlo \n");
            printf("Escribe la %d mascara que asignare \n",aux+1);
            scanf("%s",subdir[aux]);
        }
        printf("Escribe la %d puerta de enlace que asignare \n",aux+1);
        scanf("%s",enlace[aux]);
        while(!ipValida(enlace[aux])){
            printf("Error la ip no es valida, vuelve a intentarlo \n");
            printf("Escribe la %d puerta de enlace que asignare \n",aux+1);
            scanf("%s",enlace[aux]);
        }
        printf("Escribe la %d DNS que asignare \n",aux+1);
        scanf("%s",DNS[aux]); 
        while(!ipValida(DNS[aux])){
            printf("Error la ip no es valida, vuelve a intentarlo \n");
            printf("Escribe la %d DNS que asignare \n",aux+1);
            scanf("%s",DNS[aux]);
        }      
    }
    printf("************* resumen *************** \n");
    for (aux = 0; aux < TAM ; aux++){
        printf("%d) ip > %s subred >> %s >> enlace %s >> DNS >> %s \n",aux+1,ips[aux],subdir[aux],enlace[aux],DNS[aux]);
    }
	unsigned char lease[TAM][8],iplease[TAM][4];
    if((bind(ds, (struct sockaddr *)&client_addr,sizeof(client_addr))) < 0){
    	perror("\nError en Bind Cliente ");
    }else{
    	printf("Conectado... \n");
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
											formatoACK(dhcp_ack,ip2,subdir[i],enlace[i],DNS[i]);
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
											
											formatoACK(dhcp_offer,ips[veces],subdir[veces],enlace[veces],DNS[veces]);
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
											formatoACK(dhcp_offer,ip2,subdir[i],enlace[i],DNS[i]);
                                            if(!memcmp(dhcp_discover+242, opc_ack, 1)){
											tamsend = sendto(ds, dhcp_ack, 280, 0, (struct sockaddr *)&server_addr, clilen);
																if(tamsend < 0){
																	perror("\nError al enviar DHCPACK");
																}else{
																	printf("Exito al enviar DHCPACK\n");
																}
											}else{tamsend = sendto(ds, dhcp_ack, 280, 0, (struct sockaddr *)&server_addr, clilen);
																if(tamsend < 0){
																	perror("\nError al enviar DHCPACK");
																}else{
																	printf("Exito al enviar DHCPACK\n");
																}
											}
										}else{
											char ip[50];
											//sprintf(ip,"192.168.1.%d",10+(veces-i));
											formatoOffer(dhcp_offer,ips[veces],subdir[veces],enlace[veces],DNS[veces]);
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
													
													memcpy(dhcp_ack, dhcp_discover, 235);
													char ip[50];
													sprintf(ip,"192.168.1.%d",10+(veces-i));
													formatoACK(dhcp_offer,ips[veces],subdir[veces],enlace[veces],DNS[veces]);
                                                    //formatoACK(dhcp_ack,ip);
													if(!memcmp(dhcp_discover+242, opc_ack, 1)){
														tamsend = sendto(ds, dhcp_ack, 280, 0, (struct sockaddr *)&server_addr, clilen);
														if(tamsend < 0){
															perror("\nError al enviar DHCPACK");
														}else{
															printf("Exito al enviar DHCPACK\n");
														}
													}else{
														printf("es esta mamada");
													}
												}
											}
										}
											
									}
									else{
											memcpy(dhcp_offer, dhcp_discover, 160);
											char ip[50];
				//sprintf(ip,"192.168.1.%d",10+veces);
                            formatoOffer(dhcp_offer,ips[veces],subdir[veces],enlace[veces],DNS[veces]);
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
                                        guardarMAC(lease[veces],dhcp_discover);
                                        guardarIP(iplease[veces],dhcp_offer);
                                        ipPedida(dhcp_discover);
                                        memcpy(dhcp_ack, dhcp_discover, 235);
                                        formatoACK(dhcp_ack,ips[veces],subdir[veces],enlace[veces],DNS[veces]);                        
                                        if(!memcmp(dhcp_discover+242, opc_ack, 1)){
                                        tamsend = sendto(ds, dhcp_ack, 280, 0, (struct sockaddr *)&server_addr, clilen);
                                                            if(tamsend < 0){
                                                                perror("\nError al enviar DHCPACK");
                                                            }else{
                                                                printf("Exito al enviar DHCPACK\n");
                                                            }
                                        }
									veces++;		
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
														formatoACK(dhcp_ack,ip2,subdir[i],enlace[i],DNS[i]);
                                                    if(!memcmp(dhcp_discover+242, opc_ack, 1)){
															tamsend = sendto(ds, dhcp_ack, 280, 0, (struct sockaddr *)&server_addr, clilen);
															if(tamsend < 0){
																perror("\nError al enviar DHCPACK");
															}else{
																printf("Exito al enviar DHCPACK\n");
															}
														}
													}else{
														memcpy(dhcp_ack, dhcp_discover, 235);
														char ip[50];
														/*printf(ip,"%d.%d.%d.%d",iplease[i][0],iplease[i][1],iplease[i][2],iplease[i][3]);
														printf("ip %s",ip);*/
														formatoACK(dhcp_ack,ips[i],subdir[i],enlace[i],DNS[i]);
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
														/*char ip2[50];
														sprintf(ip2,"192.168.1.%d",10+veces);*/
														formatoACK(dhcp_ack,ips[veces],subdir[veces],enlace[veces],DNS[veces]);
														if(!memcmp(dhcp_discover+242, opc_ack, 1)){
															tamsend = sendto(ds, dhcp_ack, 280, 0, (struct sockaddr *)&server_addr, clilen);
															if(tamsend < 0){
																perror("\nError al enviar DHCPACK");
															}else{
																printf("Exito al enviar DHCPACK\n");
															}
														}
														veces++;
												}
												
											
										}
										else{
											printf("ya no podemos asignar mas direcciones \n");
										}
                                        
									}
								}
							}
						}

				//veces++;
			}
			
		}
	}
	close(ds);
    return 0;
}