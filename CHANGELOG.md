# Changelog

All notable changes to this project will be documented in this file.

## [UNRELEASED]

### Added

### Fixed

- Fixed password input on login form
- Fixed broken `CRUDTestCase` after switching to postgresql

### Changed

- Changed `Item` queryset to omit `USED`/`WASTED` products

## [1.0.0]

### Added

- Django + DRF basic app
- React typescript app
- Features:
  - SignIn
  - Item edits in table
  - Item creations
- Added docker stack
- Add duckduck go search
- Added React browser router
- Add ci/cd pipeline for test + upload to codecov
- Add theme toggle button
- Fix schema.yml fields as preparation to fully adopt rtk codegen
- Added `ItemStatus` switched to single item to represent mode correct data
- Limit duckduckgo searches for better performance
- Add dependabot
- Add postgres for hosting personal instance without sqlite
- Add compose.dev.yml to take same postgres just with open port
- Add deploy script to host persistent instance for personal use

### Fixed

- Pre commit hook not using poetry virtual env
- Fix broken labeler action

### Changed

- Readme format

### Removed

[UNRELEASED]: https://github.com/HomeLabHQ/expiration-tracker
[1.0.0]: https://github.com/HomeLabHQ/expiration-tracker/releases/tag/v1.0.0
