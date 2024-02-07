/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app.{js,jsx,ts,tsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      // fontFamily:{
      //     heading: Inter_400Regular,
      //     subtitle: Inter_500Medium,
      //     body: Inter_600SemiBold,
      //     bold: Inter_700Bold

      // }
    },
  },
  plugins: ["nativewind/babel"],
}

