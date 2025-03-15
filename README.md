# SMOP Java + React Native Test

Welcome to the SMOP Java + React Native test project! This repository is designed as a challenge for an eCommerce organization that sells products (e.g., Shoes, Jacket) and processes orders with dynamic currency conversion.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Backend API](#backend-api)
- [React Native App](#react-native-app)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Notes](#notes)
- [Acknowledgements](#acknowledgements)

## Overview
This project consists of:
- A **Java backend API** built using Spring Boot (with Spring Data and Spring Web) that manages products, orders, and currency exchange rates.
- A **React Native mobile application** that displays a list of products and, on tapping a product, shows its orders. Every screen includes a currency selector to update prices across the app.

**Important Details:**
- Product prices are fixed in USD.
- Orders are time-stamped and processed in local currencies based on exchange rate tables stored in the database.
- Currency rates can vary over time. Two orders placed in the same hour may reflect different conversion rates.

**Notes:**
- **Time Constraint:** The test is designed to be completed within 4 hours. It’s acceptable to implement as many features as possible within the timeframe.
- **Error Handling:** Basic exception handling is included. Extensive error handling is not required.
- **Currency Rates:** Currency exchange rates are stored in the database and can be manually updated.

## Features
- **Product List:** Displays all available products.
- **Order List:** Tapping on a product reveals a list of orders for that product.
- **Dynamic Currency Selector:** Each screen allows users to change the displayed currency, converting prices from USD using the stored exchange rates.
- **Backend API:** A Spring Boot API connected to a relational database for managing products, orders, and currency rates.

## Backend API
The backend API is built with Spring Boot and uses Spring Data for database interactions. It manages:
- **Products:** Stores details such as name and fixed price in USD.
- **Orders:** Records orders with product details and order time.
- **Currency Rates:** A table for currency rates (e.g., EUR, rate, from_time) that can be updated manually.

### Key Endpoints
- `GET /products` – Retrieve the list of products.
- `GET /products/{id}/orders` – Retrieve orders for a specific product.
- Additional endpoints for managing currency rates may be added as needed.

## React Native App
The mobile application built with React Native includes:
- **Product List Screen:** Shows a list of products with their prices (converted using the selected currency rate).
- **Order List Screen:** Displays orders for the tapped product.
- **Currency Selector:** Available on every screen to allow dynamic price conversion using the selected exchange rate.

[//]: # (TODO: Update after implementation)
## Installation

### Prerequisites
- **Backend:**
    - Java 17 or higher
    - Maven
- **Mobile:**
    - Node.js and npm/yarn
    - Expo CLI (`npm install -g expo-cli`)
    - Expo Go app on your mobile device or an emulator/simulator

### Setup Instructions

#### Backend
1. Clone the repository and navigate to the `backend` directory:
    ```bash
    git clone <repository-url>
    cd backend
    ```
2. Configure the database connection in `src/main/resources/application.properties`.
3. Build the project using Maven:
    ```bash
    mvn clean install
    ```
4. Run the Spring Boot application:
    ```bash
    mvn spring-boot:run
    ```

#### Mobile
1. Navigate to the `mobile` directory:
    ```bash
    cd mobile
    ```
2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3. Run the React Native application:
    ```bash
    npx react-native run-android
    # or
    npx react-native run-ios
    ```

## Running the Application
- **Backend:** The API should now be running on `http://localhost:8080` (or the configured port).
- **Mobile:** Launch the app on your emulator/device. Ensure that the mobile app is configured to connect to your backend API endpoint.
