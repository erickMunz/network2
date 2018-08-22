#include "tftp.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
	
RRQ fillRRQ(unsigned char *buffer){

	RRQ rrq;

	rrq.file_name = (char *) malloc(sizeof(char)*STR_MAX);
	rrq.mode = (char *) malloc(sizeof(char)*STR_MAX);

	strcpy( rrq.file_name, buffer+2);

	int file_name_len = strlen(rrq.file_name);
	strcpy(rrq.mode, buffer+file_name_len+3);

	return rrq;

}

//Regresa el tamanio
int fillRRQBuffer(unsigned char *buffer, RRQ rrq){
	
	int file_name_len = strlen(rrq.file_name);
	int mode_len = strlen(rrq.mode);
	
	buffer[0] = 0;
	buffer[1] = 1;
	
	strcpy(buffer+2, rrq.file_name);
	
	//buffer[file_name_len+1] = 0;
	
	strcpy(buffer+file_name_len+3, rrq.mode);
	
	buffer[file_name_len + mode_len + 3] = 0;	
	
	return file_name_len + mode_len + 4;
}

WRQ fillWRQ(unsigned char *buffer){
	WRQ wrq;

	wrq.file_name = (char *) malloc(sizeof(char)*STR_MAX);
	wrq.mode = (char *) malloc(sizeof(char)*STR_MAX);

	strcpy( wrq.file_name, buffer+2);

	int file_name_len = strlen(wrq.file_name);
	strcpy(wrq.mode, buffer+file_name_len+3);

	return wrq;

}

int fillWRQBuffer(unsigned char *buffer, WRQ wrq){
	
	int file_name_len = strlen(wrq.file_name);
	int mode_len = strlen(wrq.mode);
	
	buffer[0] = 0;
	buffer[1] = 2;
	
	strcpy(buffer+2, wrq.file_name);
	
	//buffer[file_name_len+1] = 0;
	
	strcpy(buffer+file_name_len+3, wrq.mode);
	
	buffer[file_name_len + mode_len + 3] = 0;	
	
	return file_name_len + mode_len + 4;
}

DATA fillDATA(unsigned char *buffer){

	int b_size = sizeof(buffer);
	DATA data;
	data.block_n = buffer[2];
	data.block_n <<= 8;
	data.block_n += buffer[3];


	//memcpy(data.data, buffer+4, b_size-4);
	for(int  i = 0; i<b_size-4; i++){
		//printf("%hu ", buffer[i+4]);
		data.data[i] = buffer[i+4];
	}
	return data;

}

int fillDATABuffer(unsigned char *buffer, DATA data){

	int data_data_len = sizeof(data.data);
	buffer[0] = 0;
	buffer[1] = 3;
	
	buffer[2] = (data.block_n  >> 8) & 0x00ff;
	buffer[3] = data.block_n & 0x00ff;


	//memcpy(buffer+4, data.data, data_data_len);
	//printf("Filling with %d\n", data_data_len);
	for(int  i = 4; i<data_data_len+4; i++){
		//printf("%hu ", data.data[i-4]);
		buffer[i] = data.data[i-4];
	}
	
	return data_data_len + 4;
}

ACK fillACK(unsigned char *buffer){

	ACK ack;

	ack.block_n = buffer[2];
	ack.block_n <<=8;
	ack.block_n += buffer[3];

	return ack;

}

//Regresa el tamanio
int fillACKBuffer(unsigned char *buffer, ACK ack){

	
	buffer[0] = 0;
	buffer[1] = 4;
	
	buffer[2] = (ack.block_n & 0xff00) >> 8;
	buffer[3] = ack.block_n & 0x00ff;
	
	return 4;
}

ERROR fillERROR(unsigned char *buffer){

	ERROR error;

	error.error_code = buffer[2];
	error.error_code <<=8;
	error.error_code += buffer[3];

	strcpy( error.error_msg, buffer+4);

	return error;

}

int fillERRORBuffer(unsigned char *buffer, ERROR error){	
	int error_msg_len = strlen(error.error_msg);
	buffer[0] = 0;
	buffer[1] = 5;
	buffer[2] = (error.error_code & 0xf0) >> 8;
	buffer[3] = error.error_code & 0x0f;
	strcpy(buffer+4, error.error_msg);
	return 4+error_msg_len;
}

void printError(unsigned char *buffer){
	ERROR error = fillERROR(buffer);
	printf("%d - %s\n", error.error_code, error.error_msg);
}

unsigned short getOptCode(unsigned char *buffer){
	
	unsigned short opt_code = buffer[0];
	opt_code <<= 8;
	opt_code += buffer[1];	
	return opt_code;
}