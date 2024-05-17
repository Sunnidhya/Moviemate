# Use a specific version of Ubuntu as base image
FROM ubuntu:20.04

# Install dependencies
RUN apt-get update && \
    apt-get install -y software-properties-common curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set working directory
WORKDIR /home

# Copy project files
COPY . .

# Install project dependencies
RUN npm install --force && \
    npm install -g expo-cli && \
    npm install -g @expo/ngrok@^4.1.0 && \
    npm install react-native-svg@14.1.0 --force

# Perform expo login (replace "your_username" and "your_password" with actual credentials)
RUN expo login -u samarpitabhaumik2017@gmail.com -p Sunnidhya1@

# Expose ports for Expo DevTools and Metro Bundler
EXPOSE 19000
EXPOSE 19001

# Define default command to start the application
CMD ["npx","expo", "start", "--tunnel"]
