# Base image
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Install browsers
RUN npx playwright install --with-deps chromium

# Set environment variables (you can override these when running the container)
ENV BASE_URL="https://www.amazon.com"
ENV USERNAME=""
ENV PASSWORD=""
ENV NAME=""

# Command to run tests with @smoke tag
CMD ["npx", "playwright", "test", "--grep", "@smoke"] 