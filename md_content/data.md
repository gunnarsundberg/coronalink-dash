# Data and Sources

## About

There are many sources of data on the Covid-19 outbreak. In our research team's attempts to get data to study the outbreak, we noticed that these datasets are fractured. In order to model the outbreak in terms of more than case and test numbers, researchers must aggregate data from many sources. We went through the pain of unifying these datasets so that you don't have to.

Our goal in creating this open dataset is to remove one of the biggest barriers of scientific research while informing the public with easy visualizations and interpretations. This data was compiled by researchers at Florida Polytechnic University and is free to use for non-commercial purposes.
            
## Overview
All of our outbreak, flight, and weather data available through the [API](/api) is updated overnight (relative to EST). Because of timezone differences, updates will not be complete until 9AM the following day (possibly before). Although we provide some live data on the dashboard, the API data is NOT a live count. Records represent daily counts. Demographics and healthcare statistics will not be updated. For a complete list of available data, visit the [API Page](/api)
            
## COVID-19 Outbreak Data
We currently have daily and cumulative outbreak data for all 50 states and the District of Columbia. We define an outbreak as 100 cases and have data beginning from the first day each state had 100 reported cases. We are working to provide county-level data in the near future.

Source: [The Covid Tracking Project](https://covidtracking.com/)

See their website for any questions pertaining to data collection methods and terms of use.
            
## Flight Data
Flight data is compiled by summing the number of inbound and outbound flights from all airports in each state with an IATA location identifier and timezone information available from OpenSky.

Source: [OpenSky Network](https://opensky-network.org/)

See their website for any questions pertaining to data collection methods and terms of use.
            
## Weather Data
State weather data is collected as an average of all weather data points from each county in the state. All data is collected from OpenWeatherMap.

Source: [OpenWeatherMap](https://openweathermap.org/)

See their website for any questions pertaining to data collection methods and terms of use.

## Demographic Data
All state demographic data is compiled from the US Census Bureau's American Community Survey 5-Year, 2014-2018.

Source: [US Census Bureau](https://www.census.gov/data/developers/data-sets/acs-5year.html)
See their website for any questions pertaining to data collection methods and terms of use.


## Our Team
* Dr. Bayazit Karaman - Assistant Professor of Computer Science
* Gunnar Sundberg - Research Assistant
* Bryce Palmer - Research Assistant
* Dominic Nyfeler - Research Volunteer

## Contact
If you encounter an issue with the application or would like to request a new feature, open a new issue on the issues tab of our github page and tag it as a `bug`, `question`, or `enhancement`, depending on which best suits your situation. If you spot an error in the data, tag your issue with `data`. If you would like to contact our team, reach out to [Dr. Bayazit Karaman](mailto:bkaraman@floridapoly.edu) or [Gunnar Sundberg](mailto:gsundberg@floridapoly.edu).