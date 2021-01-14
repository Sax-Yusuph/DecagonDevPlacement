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
### Notes while experimenting randomuser.me API
1. Although the api supports filter data based on gender, the data return is inconsistent when navigating the pages without `seed` params.
   ```
      const data1 = await axios('https://randomuser.me/api/1.0/?&results=10&gender=male')
      const data2 = await axios('https://randomuser.me/api/1.0/?&results=10&gender=male')

      <!-- expected result
      data1 == data2
      data1 should be equal to data2 on every call since *if* we are using the same params 
       -->
      <!-- output 
      // data1 !== data2
      data remains the same because of the seed params.
      -->
      
   ```


2. I tried achieving it with `seed` params which allows you to generate same set of data. but there was a **tradeoff** : - _i won't be able to filter based on gender anymore as the data returned will still be the same._
    ```
      const data1 = await axios('https://randomuser.me/api/1.0/?&seed=foobar&results=10&gender=female')
      const data2 = await axios('https://randomuser.me/api/1.0/?&seed=foobar&results=10&gender=male')

      <!-- expected result
      data1 !== data2
      data1 should not be equal with data2 since they are filtering based on different gender. 
      meaning: they have different params.
       -->


     <!-- output 
      data1 === data2
      data remains the same because of the seed params.
     -->
   ```
3. **Bottomline:** I resolved to fetching the data once, and do all the filtering manualy rather than relying on the API.
4. pagination works well with `seed` params.

### Built With 

The dashboard was built with the following amazing open source projects
* [randomuser Api]([randomuser.me/](https://randomuser.me/))
* [chakra-ui](https://chakra-ui.com)
* [framer motion](https://www.framer.com/motion/)
* [nextjs](https://nextjs.org/)
* [Travis](https://travis-ci.com) for CICD
* [Vercel](https://vercel.com) for static hosting








<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
