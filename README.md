<a name="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]
<br />
[![TimeSpent][Wakatime-shield]][Wakatime-shield]
[![CodeFactor](https://www.codefactor.io/repository/github/homelabhq/expiration-tracker/badge)](https://www.codefactor.io/repository/github/homelabhq/expiration-tracker)
[![codecov](https://codecov.io/github/HomeLabHQ/expiration-tracker/graph/badge.svg?token=7KECP9M2IS)](https://codecov.io/github/HomeLabHQ/expiration-tracker)

<div align="center">
  <h3 align="center">Expiration tracker</h3>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <a href="#demo">Demo</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

## About The Project

Main goal of this project is to allow users to track expiration dates of items(food/medication),
and hopefully eliminate huge portions of wasted food/medications.
Also as a bonus i get to dive into Typescript and Ant Design.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Demo

To try this out access demo instance at [Demo]
with credentials:

```js
email:test@example.com
password:Test12345
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![Django][Django]][Django-url]
[![React][React.js]][React-url]
[![Redux][Redux]][Redux-url]
[![Vite][Vite]][Vite-url]
[![Antd][Antd]][Antd-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

For local development you will need:

- Python 3.11.0
- Node 18.17.1
  - Yarn 1.22.19

Also strongly recommend using tools like nvm and pyenv for running specific versions of Python and Node for this project

### Installation

1. Run `make setup`
2. Initialize backend via `make be_init`
   - Creates superuser from .env variables
   - Run migrations

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

There are 2 methods of usage:

- Development environment
  - VScode debug config in you need to play around with debugger
  - Run `make start`. Please note that in this case you will manually need to add env variables.

Complete app to use

- Launch docker stack `docker compose up -d`
- Create superuser from .env `docker exec -it api python manage.py createsuperuser --no-input`
- Access via `http://hostip`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

Overall project plans and tasks can be found here

[Roadmap](https://github.com/orgs/HomeLabHQ/projects/4/views/3)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn,
inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a
pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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
[Demo]: https://g9l1dqnl-8023.euw.devtunnels.ms/
