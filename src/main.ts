import {web} from "./application/web";
import {logger} from "./application/logging";
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000

web.get('/', (req:any, res:any)=>{
    res.send('Hello World!')
})

web.listen(PORT, () => {
    logger.info("App start in http://localhost:"+PORT);
});

// web.listen(PORT, '0.0.0.0');
