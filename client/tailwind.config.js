module.exports = {
  // daftarkan semua direktori yang menggunakan tailwind
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // deklarasi warna saya sendiri
      colors: {
        primary: '#FFC947',
        secondary: '#185ADB',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
