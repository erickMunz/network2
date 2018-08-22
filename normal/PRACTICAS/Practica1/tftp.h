#define STR_MAX 500
#define DATA_MAX 512


#define REP(i, a, n) for(int  i = (a); i<(n); i++)

#ifndef TFTP_H_
#define TFTP_H_
typedef struct RRQ{
	unsigned char *file_name;
	unsigned char *mode;
} RRQ;
typedef struct WRQ{
	unsigned char *file_name;
	unsigned char *mode;
} WRQ;

typedef struct DATA{
	unsigned short block_n;
	unsigned char data[DATA_MAX]; 
} DATA;

typedef struct ACK{
	unsigned short block_n;
} ACK;

typedef struct ERROR{
	unsigned short error_code;
	unsigned char *error_msg;
} ERROR;

RRQ fillRRQ(unsigned char *buffer);
WRQ fillWRQ(unsigned char *buffer);
DATA fillDATA(unsigned char *buffer);
ACK fillACK(unsigned char *buffer);
ERROR fillERROR(unsigned char *buffer);

int fillRRQBuffer(unsigned char *buffer, RRQ rrq);
int fillWRQBuffer(unsigned char *buffer, WRQ wrq);
int fillDATABuffer(unsigned char *buffer, DATA data);
int fillACKBuffer(unsigned char *buffer, ACK ack);
int fillERRORBuffer(unsigned char *buffer, ERROR error);


unsigned short getOptCode(unsigned char *buffer);
void printError(unsigned char *buffer);


#endif // TFTP_H_