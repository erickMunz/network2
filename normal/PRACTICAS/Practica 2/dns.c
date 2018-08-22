#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <netdb.h>
#include <string.h>
#include <netinet/ip.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <time.h>
#include <stdlib.h>
//#define ANSI_COLOR_RED     "\x1b[31m"
//#define ANSI_COLOR_GREEN   "\x1b[32m"
//#define ANSI_COLOR_YELLOW  "\x1b[33m"
//#define ANSI_COLOR_BLUE    "\x1b[34m"
//#define ANSI_COLOR_MAGENTA "\x1b[35m"
//#define ANSI_COLOR_CYAN    "\x1b[36m"
//#define ANSI_COLOR_RESET   "\x1b[0m"
//148.204.103.2

/*
	OPCODE 0 - Solicitud
		   1 - Solicitud inversa
		   2 - Solicitud del estado del servidor

	Solicitud/Respuesta 0 - Solictud
						1 - Respuesta

	tipo de peticion 1 - Registro Host
					  2 - Registro (A) servidor de nombres
					  5 - Registro de alias (CNAME)
					  0C - Registro de busqueda inversa

	Clase de peticion 1 - internet
*/
int puerto = 53;
unsigned char dns[5000];

void print_ptr(int ptr){
   int sz = dns[ptr];
   int i;
   for(i = 1; i<=sz;i++)
      printf("%c", dns[ptr+i]);
   if(dns[ptr + sz + 1] == 0x00) return;
   else if(dns[ptr + sz + 1] == 0xc0){
     printf(".");
     print_ptr(dns[ptr + sz + 2]);
   }else{
      printf(".");
      print_ptr(ptr + sz + 1);
   }
}

int main(int argc, char const *argv[]){
   srand(time(NULL));
   
   int s, s2;
   socklen_t clilen;
   struct sockaddr_in server_addr, msg_to_client_addr, msg_to_server_addr, client_addr;
   
   s  = socket(AF_INET, SOCK_DGRAM, 0);
   s2 = socket(AF_INET, SOCK_DGRAM, 0);


   bzero((char *)&msg_to_server_addr, sizeof(msg_to_server_addr));
   msg_to_server_addr.sin_family = AF_INET;
   msg_to_server_addr.sin_addr.s_addr = inet_addr(argv[1]);
   msg_to_server_addr.sin_port = htons(puerto);

   bzero((char *)&client_addr, sizeof(client_addr));
   client_addr.sin_family = AF_INET;
   client_addr.sin_addr.s_addr = INADDR_ANY;
   /*cuando se utiliza por numero de puerto el 0, el sistema se encarga de asignarle uno */
   client_addr.sin_port = htons(0);
   bind(s2, (struct sockaddr *)&client_addr,sizeof(client_addr));
   /* se asigna una direccion al socket del servidor*/
   bzero((char *)&server_addr, sizeof(server_addr));
   server_addr.sin_family = AF_INET;
   server_addr.sin_addr.s_addr = INADDR_ANY;
   server_addr.sin_port = htons(puerto);
   bind(s, (struct sockaddr *)&server_addr, sizeof(server_addr));
   clilen = sizeof(msg_to_client_addr);

   while(1){
      unsigned short int id = ((rand()%(65535)) + 1);
      // dns[0]; id <<= 8;id += dns[1];
      dns[0] = (id&0xff00)>>8;
      dns[1] = (id&0x00ff);
      printf("=========== Solicitud ===========\n");
      printf("Transaction ID = %hu \n", id);
      // fflush( stdin );
      unsigned short int opcode;
      // opcode <<= 8;opcode += dns[3];
      printf("OPCODE         = ");
      scanf("%hu", &opcode);
      dns[2] = (opcode&0xff00)>>8; 
      dns[3] = (opcode&0x00ff);
      // printf("OPCODE         = %hu \n", opcode);
      unsigned short int questions = 1;
      // questions <<= 8;questions += dns[5];
      printf("Preguntas      = ");
      scanf("%hu", &questions);
      dns[4] = (questions&0xff00)>>8;
      dns[5] = (questions&0x00ff);
      unsigned short int answers = 0;
      // answers <<= 8;answers += dns[7];
      dns[6] = (answers&0xff00)>>8;
      dns[7] = (answers&0x00ff);
      printf("Answers RRs    = %hu \n", answers);
      unsigned short int authority = 0;
      // authority <<= 8;authority += dns[9];
      dns[8] = (authority&0xff00)>>8;
      dns[9] = (authority&0x00ff);
      printf("Authority RRs  = %hu \n", authority);
      unsigned short int additional = 0;
      // additional <<= 8;additional += dns[11];
      dns[10] = (authority&0xff00)>>8;
      dns[11] = (authority&0x00ff);
      printf("Additional RRs = %hu \n\n", additional);
      int q = 12;
      printf("Consultas > \n\n");
      for (int i = 0; i < questions; ++i){
         char name[1024];
         printf("Name           = ");
         fflush( stdin );
         scanf("%s", name);
         fflush( stdin );
         for(int j = 0, k = j; j < strlen(name) && k < strlen(name); j++, k++){
            for(;name[k] != '.' && name[k] != '\0';) 
               k++;
            dns[q++] = k - j;
            for(; name[j] != '.' && name[j] != '\0';) 
               dns[q++] = name[j++];
         }
         dns[q++] = '\0';
         // printf("Name           = %s \n", name);
         unsigned short type; 
         //type <<=8; type += dns[++q];
         printf("Type           = ");
         scanf("%hu", &type);
         dns[q++] = 0;
         dns[q++] = type;
         // printf("Type           = %hi \n", type);
        
         unsigned short class; 
         // class <<=8; class += dns[++q];
         printf("Class          = ");
         scanf("%hu", &class);
         // dns[++q] = 0;
         dns[q++] = 0;
         dns[q++] = class;
      }
      socklen_t msg_len = sizeof(msg_to_server_addr);
      sendto(s2, (char *) dns,  q, 0, (struct sockaddr *) &msg_to_server_addr, msg_len);
      int len_res = recvfrom(s2, (char *) dns, sizeof(dns), 0, (struct sockaddr *)&msg_to_server_addr, &msg_len);
      printf("=========== Respuesta ===========");

      id = dns[0];id <<= 8;id += dns[1];

      printf("Transaction ID = %hu \n", id);

      opcode =  dns[2];
      opcode <<= 8;
      opcode += dns[3];
          
      printf("OPCODE         = %hu \n", opcode);

      questions = dns[4];
      questions <<= 8;
      questions += dns[5];

      printf("Preguntas      = %hu \n", questions);

      answers = dns[6];
      answers <<= 8;
      answers += dns[7];

      printf("Answers RRs    = %hu \n", answers);

      authority = dns[8];
      authority <<= 8;
      authority += dns[9];

      printf("Authority RRs  = %hu \n", authority);

      additional = dns[10];
      additional <<= 8;
      additional += dns[11];

      printf("Additional RRs = %hu \n\n", additional);

      q = 12;
      printf("Consultas > \n\n");
      for(int i = 0; i < questions; ++i){
          char data[1024];
          int j = 0;
          while(dns[q] != '\0') data[j++] = dns[q++];
          data[j] = dns[q];
          printf("Name           = ");
          for(int j = 0, sz = data[j]; sz > 0 && j < strlen(data);){
            int k = 1;
            for(;k<=sz;k++){
               printf("%c", data[k+j]);
            }
            j += sz + 1;
            sz = data[j];
            if(sz > 0) printf(".");
          }
          printf("\n");
          unsigned short type = dns[++q]; 
          type <<=8; 
          type += dns[++q];
          printf("Type           = %hi \n", type);
          unsigned short class = dns[++q]; 
          class <<=8; 
          class += dns[++q];
          printf("Class          = %hi \n\n", class);
      }
      printf("Answers > \n\n");
      for (int i = 0; i < answers; ++i){
          printf("\nName           = ");
          if(dns[++q] == 0xc0){
               print_ptr(dns[++q]);
          }
          printf("\n");
          unsigned short type = dns[++q]; type <<=8; type += dns[++q];
          printf("Type           = %hi \n", type);
          unsigned short class = dns[++q]; class <<=8; class += dns[++q];
          printf("Class          = %hi \n", class);
          unsigned int ttl = 0;
          for(int j = 3; j >=0; j--){
            unsigned char aux = dns[++q];
            ttl += (aux<<(8*j));
          }

          printf("TTL            = %u \n", ttl);
          unsigned short data_len = dns[++q]; data_len <<= 8; data_len += dns[++q];
          printf("Data length    = %hi \n", data_len);
          if(type == 1){
            printf("Address        = ");
            for(int j = 3; j >=0; j--){
               unsigned char aux = dns[++q];
               printf("%i", aux);
               if(j > 0) printf(".");
               else printf("\n");
            }
          }else if(type == 2){
            printf("Name server    = ");
            for (int j = 1; j <= data_len; ++j){
               unsigned char aux = dns[q+j];
               if(aux==0x00) break;
               else{
                  if(j!=1)
                     printf(".");
               }
               if(aux == 0xc0){
                  print_ptr(dns[q+j+1]);
                  j++;
               }else{
                  int k = 1;
                  for (; k <= aux; k++)
                  {
                     printf("%c", dns[q+j+k]);
                  }
                  j+=aux;
               }

            } 
            printf("\n\n");
            q += data_len;
          }
      }

      if(authority > 0)
         printf("Authoritative nameservers > \n\n");
      for (int i = 0; i < authority; ++i){
          printf("\nName           = ");
          if(dns[++q] == 0xc0){
               print_ptr(dns[++q]);
          }
          printf("\n");
          unsigned short type = dns[++q]; type <<=8; type += dns[++q];
          printf("Type           = %hi \n", type);
          unsigned short class = dns[++q]; class <<=8; class += dns[++q];
          printf("Class          = %hi \n", class);
          unsigned int ttl = 0;
          for(int j = 3; j >=0; j--){
            unsigned char aux = dns[++q];
            ttl += (aux<<(8*j));
          }

          printf("TTL            = %u \n", ttl);
          unsigned short data_len = dns[++q]; data_len <<= 8; data_len += dns[++q];
          printf("Data length    = %hi \n", data_len);
          printf("Name server    = ");
            for (int j = 1; j <= data_len; ++j){
               unsigned char aux = dns[q+j];
               if(aux==0x00) break;
               else{
                  if(j!=1)
                     printf(".");
               }
               if(aux == 0xc0){
                  print_ptr(dns[q+j+1]);
                  j++;
               }else{
                  int k = 1;
                  for (; k <= aux; k++)
                  {
                     printf("%c", dns[q+j+k]);
                  }
                  j+=aux;
               }
            } 
            printf("\n\n");
            q += data_len;
      }
      if(additional > 0)
         printf("Additional records > \n\n");
      for (int i = 0; i < additional; ++i){
          printf("\nName           = ");
          if(dns[++q] == 0xc0){
               print_ptr(dns[++q]);
          }
          printf("\n");
          unsigned short type = dns[++q]; type <<=8; type += dns[++q];
          printf("Type           = %hi \n", type);
          unsigned short class = dns[++q]; class <<=8; class += dns[++q];
          printf("Class          = %hi \n", class);
          unsigned int ttl = 0;
          for(int j = 3; j >=0; j--){
            unsigned char aux = dns[++q];
            ttl += (aux<<(8*j));
          }

          printf("TTL            = %u \n", ttl);
          unsigned short data_len = dns[++q]; data_len <<= 8; data_len += dns[++q];
          printf("Data length    = %hi \n", data_len);
          if(type == 1){
            printf("Address        = ");
            for(int j = 3; j >=0; j--){
               unsigned char aux = dns[++q];
               printf("%i", aux);
               if(j > 0) printf(".");
               else printf("\n");
            }
          }else if(type == 2){
            printf("Name server    = ");
            for (int j = 1; j <= data_len; ++j){
               unsigned char aux = dns[q+j];
               if(aux==0x00) break;
               else{
                  if(j!=1)
                     printf(".");
               }
               if(aux == 0xc0){
                  print_ptr(dns[q+j+1]);
                  j++;
               }else{
                  int k = 1;
                  for (; k <= aux; k++){
                     printf("%c", dns[q+j+k]);
                  }
                  j+=aux;
               }
            } 
            printf("\n\n");
            q += data_len;
          }else if(type == 0x1c){
            printf("AAAA Address   = ");
            for (int j = 1; j <= data_len; j+=2){
               for(int k = 0; k<2; k++)
                printf("%02x", dns[q+j+k]);
              if(j <  7) printf(":");
            } 
            printf("\n\n");
            q += data_len;
          }
      }
   }
}