import { inspect } from 'util';

const logger = (message: string | any, topic: string = 'INFO', object?: Record<string, any>) => {

    const date = new Date();
    const displayTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} # ${topic}`;

    /* Note: Displaying the full object for logging purposes */
    if (object || typeof (message) === 'object') {
        console.log(`${displayTime} - ${message} ${inspect(object, { showHidden: false, colors: true })}`);
    } else {
        console.log(`${displayTime} - ${message}`);
    }
};

export { logger };