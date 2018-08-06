#include <sys/types.h>
#include <sys/time.h>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <netdb.h>
#include <string.h>
#include <netinet/ip.h>
#include <arpa/inet.h>
#include <unistd.h>

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

				char *cacho = strtok(".",ip);
				while(cacho!=NULL){
					printf("%s",cacho);
				}
				paq[0] = 2;
		    	paq[8] = 0;
				paq[9] = 0;
				//ip_ofertada
				paq[16] = (int) cacho;
				paq[17] = (int) cacho;
				paq[18] = (int) cacho;
				paq[19] = (int) cacho;

				paq[20] = 192;
				paq[21] = 168;
				paq[22] = 1;
				paq[23] = 100;

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
void guardarIP(unsigned char *paq){
    
}
int main(int argc, char const *argv[]){
    unsigned char dhcp_discover[361], dhcp_offer[274], dhcp_ack[280], opc_ack[1] = {0x03}, lease[10][8];
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
				int i;
				if(esRequest(dhcp_discover)){
					printf("es request");
				}
				printf("Imprimiendo Discover \n\n  ");
                imprimeTrama(dhcp_discover,360);
				memcpy(dhcp_offer, dhcp_discover, 160);

				

				tamsend = sendto(ds, dhcp_offer, 274, 0, (struct sockaddr *)&server_addr, clilen);
				if(tamsend < 0){
		    		perror("\nError en sendto");
		    	}else{
		    		printf("Exito al enviar DHCPOFFER\n");
					printf("imprime DHCPOFFER \n ");
				
		    		//Request
    				tamrecv = recvfrom(ds, dhcp_discover, sizeof(dhcp_discover), 0, (struct sockaddr *)&client_addr, &clilen);
    				if(tamrecv < 0){
    					perror("\nError al recibir DHCPREQUEST");
    				}else{
    					printf("Exito al recibir DHCPREQUEST\n");
						mac(dhcp_discover);

    					memcpy(dhcp_ack, dhcp_discover, 235);
    					//ACK
				    	dhcp_ack[0] = 2;
				    	dhcp_ack[8] = 0;
						dhcp_ack[9] = 0;

						dhcp_ack[16] = 192;
						dhcp_ack[17] = 168;
						dhcp_ack[18] = 1;
						dhcp_ack[19] = 10;

						dhcp_ack[20] = 192;
						dhcp_ack[21] = 168;
						dhcp_ack[22] = 1;
						dhcp_ack[23] = 100;

						dhcp_ack[24] = 192;
						dhcp_ack[25] = 168;
						dhcp_ack[26] = 1;
						dhcp_ack[27] = 1;

						dhcp_ack[236] = 99;
						dhcp_ack[237] = 130;
						dhcp_ack[238] = 83;
						dhcp_ack[239] = 99;

						dhcp_ack[240] = 53;
						dhcp_ack[241] = 1;
						dhcp_ack[242] = 5;
						//OPTION TIME
						dhcp_ack[243] = 51;
						dhcp_ack[244] = 4;
						dhcp_ack[245] = 0;
						dhcp_ack[246] = 0;
						dhcp_ack[247] = 0;
						dhcp_ack[248] = 60;
						//OPCION SUBNET MASK
						dhcp_ack[249] = 1;
						dhcp_ack[250] = 4;
						dhcp_ack[251] = 0xff;
						dhcp_ack[252] = 0xff;
						dhcp_ack[253] = 0xff;
						dhcp_ack[254] = 0;
						//OPTION ROUTER
						dhcp_ack[255] = 3;
						dhcp_ack[256] = 4;
						dhcp_ack[257] = 192;
						dhcp_ack[258] = 168;
						dhcp_ack[259] = 1;
						dhcp_ack[260] = 1;
						//OPTION DNS
						dhcp_ack[261] = 6;
						dhcp_ack[262] = 4;
						dhcp_ack[263] = 148;
						dhcp_ack[264] = 204;
						dhcp_ack[265] = 103;
						dhcp_ack[266] = 2;
						//OPT BROADCAST
						dhcp_ack[267] = 28;
						dhcp_ack[268] = 4;
						dhcp_ack[269] = 192;
						dhcp_ack[270] = 168;
						dhcp_ack[271] = 1;
						dhcp_ack[272] = 255;
						//OPT BROADCAST
						dhcp_ack[273] = 0x36;
						dhcp_ack[274] = 4;
						dhcp_ack[275] = 192;
						dhcp_ack[276] = 168;
						dhcp_ack[277] = 1;
						dhcp_ack[278] = 100;

						dhcp_ack[279] = 0xff;
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
			}
		}
	}
	close(ds);
    return 0;
}