# Overview
Our API provides several endpoints with differing options and parameters. Currently we offer the `outbreak`, `distancing`, `demographics`, `weather`, `flights`, and `regions` endpoints. 

## Policies

### Data Quality
We strive to have the most accurate data possible and have used the most reputable sources available to us. All of our sources are listed on [the data page](/data). Although we employ some automated data checks, for the most part our data is imported from our sources as-is and is not checked for accuracy. Please check with our sources to find out about collection methods, and, as always, please feel free to reach out to us with any questions or issues.

### Throttling
Our current throttling policy is a flat 100 requests/hour. In the future, we plan to allow users to register for higher rates.

### Versioning
Although this free software is offered with no guarantees of performance or availability, we can guarantee that the API will not have any breaking changes without a version change. No endpoints will be removed (although some may be added without a version change) and all path parameters and query parameters will continue to function as expected. Data naming will not change. Changes and versions will be documented on this page. The current version is `v1`.

## Query Structure

### Path Parameters
Path parameters are used to specify the domain of the data returned within an endpoint. For instance, a path parameter may change the type of region (state vs county) or the time (cumulative, daily, historic etc). These parameters may change the response format within an endpoint. In general, endpoints will follow the pattern:

`{endpoint}/{time path parameters}/{region path parameter}`

Path parameters differ by endpoint and will be explained for each endpoint.

### Query Parameters
Query parameters are used to filter results by an attribute. These parameters will not change the response format. Only the set of results returned will differ. To use query parameters, append `?{attribute}={value}` to the request url. For instance, if we wanted data only for the state of Florida, we would append `?state=FL` to our request url. The `&` operator may be used to chain multiple conditions. Currently, `&` is the only supported logical operator, and equality is the only condition we may specify. We are working to expand this in a future release.

# Endpoints

## `outbreak` Endpoint
The outbreak endpoint provides COVID-19-specific data for each of the regions we track. 

### Path Parameters
Path parameters follow the pattern:
 `outbreak/{time path parameters}/{region path parameter}`
 
#### Time Path Parameters
The current time path parameter options are as follows:

##### `/daily`
`daily` outbreak records represent data points that occurred only on one day. For instance, `cases` data under the `/daily` path parameter will only show cases reported on that day, not the cumulative count as of that day. For comparison, some other sources call this the increase.

###### Response Format
~~~
date: UTC date format ("YYYY-MM-DD")
cases: int
negative_tests: int
total_tested: int
deaths: int
admitted_to_hospital: int - Newly admitted COVID hospital patients
hospitalized: int - Total COVID patients in hospital on this day
in_icu: int
days_since_outbreak: int - days since region reached 100 cases
~~~

##### `/cumulative`
`cumulative` outbreak records represent current, cumulative data. Only data from the most current date available is shown. Sticking with the `cases` example, `cases` data under the `/cumulative` path parameter will show all reported cases for the duration of the outbreak up until the date shown.

###### Response format
~~~
date: UTC date format ("YYYY-MM-DD")
cases: int
negative_tests: int
total_tested: int
deaths: int
hospitalized: int
in_icu: int
days_since_outbreak: int
date_of_outbreak: UTC date format
~~~

##### `/cumulative/historic`
Data under the `/cumulative/historic` path parameter are the same as those under `/cumulative`. The only difference is that data under `cumulative/historic` shows past cumulative data.

###### Response format
~~~
date: UTC date format ("YYYY-MM-DD")
cases: int
negative_tests: int
total_tested: int
deaths: int
hospitalized: int
in_icu: int
days_since_outbreak: int
date_of_outbreak: UTC date format ("YYYY-MM-DD")
~~~

#### Region Type Path Parameters

##### `/states`
Data under the `/states` region parameter shows data at the state level.

###### Additional Response Fields
Data under the `/states` region parameter add the following fields to the response:

`state:` `string` - US State Abbreviation
 

###### Query Parameters
* `state`
* `date`

## `distancing` Endpoint
The distancing endpoint contains information related to policies aimed at increasing social distancing and reducing virus spread. Currently, we have data on stay at home orders and school closures.

### Path Parameters
Path parameters follow the pattern:
 `outbreak/{distancing type parameter}/{region path parameter}`

#### Distancing Type Parameters

##### `/schoolclosure`
Records under the `/schoolclosure` path parameter indicate school closures through the `order` property, which can take one of three values: `Active`, `Expired`, or `None`. Regions may have multiple orders with alternating values of `Active` and `Expired`, but no more than one record with `None`. 

Schools that ended the school year under a closure order will not have their order considered `Expired` until they return to school, as this is meant to be used to track the impact of students being in school.

###### Response Format
~~~
order: enum/string
date: UTC date format ("YYYY-MM-DD")
~~~

##### `/stayinplace`
Records under the `/stayinplace` path parameter indicate regional stay in place orders through the `order` property, which, just as with `/schoolclosure`, can take one of three values: `Active`, `Expired`, or `None`. Regions may have multiple orders with alternating values of `Active` and `Expired`, but no more than one record with `None`. 

#### Region Type Path Parameters

##### `/states`
Data under the `/states` region parameter shows data at the state level.

###### Additional Response Fields
Data under the `/states` region parameter add the following fields to the response:

`state:` `string` - US State Abbreviation
 

###### Query Parameters
* `state`
* `date`

## `demographics` Endpoint
Demographic data compiled from the US Census Bureau’s American Community Survey 5-Year, 2014-2018.

### Response Format
~~~
population: int
population_density: float - measured in persons/km^2 of land area
percent_male: float
percent_female: float
median_age: float
percent_60s: float
percent_70s: float
percent_80_plus": float
~~~

### Path Parameters
Path parameters follow the pattern:
 `demographics/{region path parameter}`
 
#### Region Type Path Parameters

##### `/states`
Data under the `/states` region parameter shows data at the state level.

###### Additional Response Fields
Data under the `/states` region parameter add the following fields to the response:

`state:` `string` - US State Abbreviation

###### Query Parameters
* `state`

## `weather` Endpoint

### Path Parameters
Path parameters follow the pattern:
 `weather/{time path parameters}/{region path parameter}`

#### Time Path Parameters
The current time path parameter options are as follows:

##### `/daily`
`daily` weather records represent weather for a region on a given day.

###### Response Format
~~~
date: UTC date format ("YYYY-MM-DD")
avg_temperature: float
max_temperature: float
min_temperature: float
avg_humidity: float
uv_index: float
~~~

#### Region Type Path Parameters

##### `/states`
Data under the `/states` region parameter shows data at the state level. It is worth noting that state-level weather doesn't truly exist. Rather, these are averages of measurements from each county within a state.

###### Additional Response Fields
Data under the `/states` region parameter add the following fields to the response:

`state:` `string` - US State Abbreviation

###### Query Parameters
* `state`
* `date`

## `flights` Endpoint
Inbound and outbound flight data for FAA Primary Airports.
### Path Parameters
Path parameters follow the pattern:
 `flights/{time path parameters}/{region path parameter}`

#### Time Path Parameters
The current time path parameter options are as follows:

##### `/daily`
`daily` flight records represent flights for a region on a given day.

###### Response Format
~~~
date: UTC date format ("YYYY-MM-DD")
number_of_inbound_flights: int
number_of_outbound_flights: int
~~~

#### Region Type Path Parameters

##### `/states`
Data under the `/states` region parameter shows data at the state level.

###### Additional Response Fields
Data under the `/states` region parameter add the following fields to the response:

`state:` `string` - US State Abbreviation

###### Query Parameters
* `state`
* `date`

## `regions` endpoint
Endpoint listing regions and identifying information related to each.

### Response Format
~~~
name: string
fips_code: string
~~~

### Path Parameters
Path parameters follow the pattern:
 `regions/{region path parameter}`
 
#### Region Type Path Parameters

##### `/states`
Data under the `/states` region parameter shows data at the state level.

###### Additional Response Fields
Data under the `/states` region parameter add the following fields to the response:

`code:` `string` - US State Abbreviation

