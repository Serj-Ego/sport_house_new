# Welcome to Sport House!

The Sport House project was created with the support of the State Innovation Promotion Fund. Designed for the entire population of the Russian Federation in the field of sports.


## Target

The goal of R&D is to maximize the pace of digital transformation in the field of physical culture and sports.
The main scientific and technical problems that the R&D implementation solves are:

 - Development and implementation of artificial intelligence technologies in the field of sports
 - Development and implementation of specialized neural network algorithms for depreciation analysis and accounting for the quality of sports equipment
 - Creation of a unified system for planning sports events and reporting
 - Automate the intelligent search for sporting events and venues

## Stack




![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white) ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37) ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) 

## Interaction scheme
Scheme of interaction between the client part and the API:

```mermaid
graph LR
A[Client] -- Request --> B((REST API Service))
B --> D{DataBase}
C((REST API Service)) -- Response --> A
D --> C
```
