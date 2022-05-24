const logger = (message: string | any, topic?: string) => {

    const date = new Date();
    const displayTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} # ${topic ? topic : 'INFO'}`;

    console.log(`${displayTime} - ${message}`)
};

export { logger };