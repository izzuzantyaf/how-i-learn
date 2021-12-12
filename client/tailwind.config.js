module.exports = {
  // daftarkan semua direktori yang menggunakan tailwind
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'],
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
