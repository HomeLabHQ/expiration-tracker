<a name="readme-top"></a>
[![LinkedIn][linkedin-shield]][linkedin-url]
<br />
[![TimeSpent][Wakatime-shield]][Wakatime-shield]
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=HomeLabHQ_expiration-tracker&metric=coverage)](https://sonarcloud.io/summary/new_code?id=HomeLabHQ_expiration-tracker)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=HomeLabHQ_expiration-tracker&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=HomeLabHQ_expiration-tracker)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=HomeLabHQ_expiration-tracker&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=HomeLabHQ_expiration-tracker)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=HomeLabHQ_expiration-tracker&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=HomeLabHQ_expiration-tracker)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=HomeLabHQ_expiration-tracker&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=HomeLabHQ_expiration-tracker)
[![Build](https://github.com/HomeLabHQ/expiration-tracker/actions/workflows/build.yml/badge.svg)](https://github.com/HomeLabHQ/expiration-tracker/actions/workflows/build.yml)
[![Ruff](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json)](https://github.com/astral-sh/ruff)

# Expiration tracker

## Project description

<a href="https://homelabhq.github.io/expiration-tracker/"><img src="https://img.shields.io/badge/doc-mkdocs-02a6f2?style=flat-square&logo=read-the-docs" alt="Documentation"></a>

Main goal of this project is to allow users to track expiration dates of items(food/medication),
and hopefully eliminate huge portions of wasted food/medications.
Also as a bonus i get to dive into Typescript and Ant Design.

## Demo instance

To try this out access demo instance at [Demo]
with credentials:

```js
email:staging@example.com
password:Test12345
```

## Built With

[![Django][Django]][Django-url]
[![React][React.js]][React-url]
[![Redux][Redux]][Redux-url]
[![Vite][Vite]][Vite-url]
[![Antd][Antd]][Antd-url]

## Development environment

- Clone repository
- Install requirement runtime
- Install dependencies via `make setup`
- Start dev dependencies via `make dev`
- Start debug configurations located in `launch.json`
- Init backend database via `make be_init`

### Prerequisites

For local development you will need:

- Python 3.11.0
- Node 18.17.1
  - Yarn 1.22.19

Also strongly recommend using tools like nvm and pyenv for running specific versions of Python and Node for this project

> NOTE: Additionally install poetry self add poetry-dotenv-plugin to auto load env variables in shell and run command

## Deploy

There is 2 separate methods for deploy:

- Standalone included DB + Nginx that are accessible from outside `compose.yml`
- Slim (without DB) and configurable port number to be exposed `compose.slim.yml`

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/oleksandr-korol/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Antd]: https://img.shields.io/badge/antd-20232A?style=for-the-badge&logo=antdesign&logoColor=61DAFB
[antd-url]: https://ant.design/
[redux]: https://img.shields.io/badge/Redux%20toolkit-20232A?style=for-the-badge&logo=redux&logoColor=61DAFB
[redux-url]: https://reactjs.org/
[Vite]: https://img.shields.io/badge/Vite-20232A?style=for-the-badge&logo=vite&logoColor=61DAFB
[Vite-url]: https://vitejs.dev/
[Django]: https://img.shields.io/badge/Django-20232A?style=for-the-badge&logo=django&logoColor=61DAFB
[Django-url]: https://www.djangoproject.com/
[Wakatime-shield]: https://wakatime.com/badge/user/b235aad2-892a-4e83-b8c3-a6cc36bc4cf4/project/9e8caf94-21bb-4372-9c1e-00e07136d2d3.svg
[Demo]: https://expiration-tracker-staging.dufran.org/login
