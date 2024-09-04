/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}","./components/**/*.{html,js,jsx}"],
    theme: {
      
        screens:{
          'md1':{'max':'500px'}
        },
      extend: {},
    },
    plugins: [],
  }