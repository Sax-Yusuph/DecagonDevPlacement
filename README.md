<p align="center">
  <a href="https://github.com/Sax-Yusuph/Web-Dashboard-UI">
    <img src="logo.png" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">Decagon Web Dashboard </h1>

  <p align="center">
    This repository contains source code for the web dashboard ui
    <br />
    <a href="https://web-dashboard-ui.vercel.app/"><strong>Explore Demo »</strong></a>
</p>

<p align="center">

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Sax-Yusuph/Web-Dashboard-UI?style=for-the-badge)
![Travis (.com) branch](https://img.shields.io/travis/com/Sax-Yusuph/Web-Dashboard-UI/main?style=for-the-badge)
![Coveralls github](https://img.shields.io/coveralls/github/Sax-Yusuph/Web-Dashboard-UI?logo=c&logoColor=%234caf50&style=for-the-badge)
![GitHub](https://img.shields.io/github/license/Sax-Yusuph/Web-Dashboard-UI?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/Sax-Yusuph/Web-Dashboard-UI?label=Forks&style=for-the-badge)
![GitHub package.json version](https://img.shields.io/github/package-json/v/Sax-Yusuph/Web-Dashboard-UI?style=for-the-badge&color=%23ff6800)
</p>





<!-- ABOUT THE PROJECT -->
### :pencil: Notes while experimenting randomuser.me API 
1. :bug:  Although the api supports filter data based on gender, the data return is inconsistent when navigating the pages without `seed` params.
   ```
      const data1 = await axios('https://randomuser.me/api/1.0/?&results=10&gender=male')
      const data2 = await axios('https://randomuser.me/api/1.0/?&results=10&gender=male')

      <!-- expected result 
      // _if we use the same params to call the API_
           data1 == data2
       data1 should be equal to data2 on every call since we are using the same params 
       -->
      <!-- output 
      // data1 !== data2
     :bug:  but data1 is not the same as data 2 despite using the same params
      -->
      
   ```


2. :bug:  I tried achieving it with `seed` params which allows you to generate same set of data. but there was a **tradeoff** : - _i won't be able to filter based on gender anymore as the data returned will still be the same._
    ```
      const data1 = await axios('https://randomuser.me/api/1.0/?&seed=foobar&results=10&gender=female')
      const data2 = await axios('https://randomuser.me/api/1.0/?&seed=foobar&results=10&gender=male')

      <!-- expected result
      // now if we use the different params to call the API. in this case by gender.
           data1 !== data2
      data1 should not be equal with data2 since they are filtering based on different gender. 
      
       -->


     <!-- output 
      data1 === data2
      data remains the same because of the seed params present.
     -->
   ```
3. :dart: **Bottomline:** I resolved to fetching the data once, and do all the filtering manualy rather than relying on the API. 
4. pagination works well with `seed` params.

<br/>

### Built With :tada:  :tada:
The dashboard was built with the following amazing open source projects
* [randomuser Api]([randomuser.me/](https://randomuser.me/))
* [chakra-ui](https://chakra-ui.com)
* [framer motion](https://www.framer.com/motion/)
* [nextjs](https://nextjs.org/)
* [Travis](https://travis-ci.com) for CICD
* [Vercel](https://vercel.com) for static hosting


### Extra features i added :tada: :tada:
* Dark mode feature
* Search can filter based on any of the user property
* Pagination
* Subtle animations
* Download users on current page into CSV
