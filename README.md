# Decagon Web Dashboard UI
this repository contains source code for the web dashboard ui

##Notes while experimenting randomuser.me API
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