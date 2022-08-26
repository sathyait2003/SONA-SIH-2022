# SabhyaServer

![image info](./public/logo.svg)

### File Structure

```

README.md
ethereum
   |-- build
   |   |-- Resource.json
   |   |-- ResourceHei.json
   |-- compile.js
   |-- contracts
   |   |-- ResourceHei.sol
   |-- deploy.js
   |-- hei.js
   |-- resource.js
   |-- web3.js
next.config.js
package-lock.json
package.json
postcss.config.js
public
   |-- addButton_active.svg
   |-- addButton_inactive.svg
   |-- eye.svg
   |-- individual_icon.svg
   |-- institution_icon.svg
   |-- logo.svg
   |-- logo_font.svg
   |-- logo_large.svg
   |-- metamask_icon.svg
src
   |-- pages
   |   |-- _app.js
   |   |-- api
   |   |   |-- hello.js
   |   |-- explore
   |   |   |-- Explore.module.css
   |   |   |-- index.js
   |   |-- hei
   |   |   |-- [address]
   |   |   |   |-- index.js
   |   |   |   |-- new.js
   |   |   |   |-- newdowload.js
   |   |   |-- new.js
   |   |-- index.js
   |   |-- index.module.css
   |   |-- login
   |   |   |-- index.js
   |   |-- onboarding
   |   |   |-- Onboarding.module.css
   |   |   |-- index.js
   |   |-- profile
   |   |   |-- Profile.module.css
   |   |   |-- index.js
   |   |-- settings
   |   |   |-- Settings.module.css
   |   |   |-- index.js
   |-- styleGuide
   |   |-- components
   |   |   |-- displayCard
   |   |   |   |-- DisplayCard.module.css
   |   |   |   |-- index.js
   |   |   |-- floatingButton
   |   |   |   |-- FloatingButton.module.css
   |   |   |   |-- index.js
   |   |   |-- inputBox
   |   |   |   |-- InputBox.module.css
   |   |   |   |-- index.js
   |   |   |-- multipleSelectButton
   |   |   |   |-- MultipleSelectButton.module.css
   |   |   |   |-- index.js
   |   |   |-- navBar
   |   |   |   |-- Navbar.module.css
   |   |   |   |-- index.js
   |   |   |-- sideNav
   |   |   |   |-- SideNav.module.css
   |   |   |   |-- index.js
   |   |   |-- spinner
   |   |   |   |-- Spinner.module.css
   |   |   |   |-- index.js
   |   |   |-- templates
   |   |   |   |-- SubscribeToForm.js
   |   |   |-- welcome
   |   |   |   |-- Welcome.module.css
   |   |   |   |-- index.js
   |   |-- layout
   |   |   |-- onboarding
   |   |   |   |-- Onboarding.module.css
   |   |   |   |-- pageOne.js
   |   |   |   |-- pageThree.js
   |   |   |   |-- pageTwo.js
   |   |   |-- sidenav
   |   |   |   |-- SideNavLayout.module.css
   |   |   |   |-- index.js
   |   |-- page
   |   |   |-- login
   |   |   |   |-- Login.module.css
   |   |   |   |-- index.js
   |-- styles
   |   |-- globals.css
tailwind.config.js


```

---

### Instructions to Commit

- npm run format
- git add "specific change"
- git commit -m "specific change commit name"
- After the "commit" instruction pre-commit hook will run to check formatting and build a prototype to measure performance and errors.

### Instructions to run this application
- npm i
- npm run dev
