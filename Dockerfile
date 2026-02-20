FROM node:22-slim

# Install system dependencies for build
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Ionic CLI globally
RUN npm install -g @ionic/cli

# Copy package files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project source
COPY . .

# Expose Ionic dev server port
EXPOSE 8100

# Run ionic serve with external access host
CMD ["npx", "ionic", "serve", "--host", "0.0.0.0", "--external", "--no-open"]
