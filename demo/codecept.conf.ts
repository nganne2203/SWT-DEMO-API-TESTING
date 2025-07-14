import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './*_test.ts', // specify the path to your test files
  output: './output', // change file if you want to save output in a different directory
  helpers: {
    REST: {
      endpoint: 'http://localhost:8080', // you can change this to your API endpoint like 'https://api.example.com'
      // here do not need the api endpoint, because we have defined it in the REST helper
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      // it same when you use postman --> you have to set up the content-type in header
      // --> command above replace this action
      // in postman
    },
    JSONResponse: {}
  },
  include: {
    I: './steps_file'
  },
  name: 'demo'
}