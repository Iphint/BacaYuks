# Gunakan image Node.js dan Expo sebagai dasar
FROM node:14.17.5

# Buat direktori kerja
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Install Expo CLI secara global
RUN npm install -g expo-cli

# Install dependensi proyek
RUN npm install

# Salin seluruh kode sumber proyek
COPY . .

# Eksekusi perintah untuk memulai proyek React Native dengan Expo
CMD ["npm", "start", "android"]