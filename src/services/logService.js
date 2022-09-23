import Raven from "raven-js";

  function init() {
       Raven.config('https://8f1304c399114c64a0885785e2146dd3@o1422588.ingest.sentry.io/6769520',{
              release:'1-0-0',
              environment:'DEVELOPMENT-TEST',
       }).install();
       
}

  function log(error) {
       Raven.captureException(error);  
}

const logger={
       init,
       log
}

export default logger;

