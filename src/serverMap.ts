interface IServersMap {
    [serverName: string]: {
        host: string;
        port: number;
    }
}

export const serversMap: IServersMap = {
    ['sample-server']: {
        host: 'name.example.com',
        port: 3333
    },
    ['crm-server']: {
        host: 'localhost',
        port: 4444
    },
    ['web-server']: {
        host: '192.168.31.233',
        port: 5555
    }
}
