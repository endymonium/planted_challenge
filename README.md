# Planted Challange

## Notes

- The idea was to try to use ChartGPT as much as possible to solve this challenge, therefore the code is a little bit barebone (no tests, etc)
- I assumed the result should be filtered based on the distance, in real life I would of course clarify that assumption with the user story creator :)

## Project Setup

`npx create-react-app planted-challenge`

then to start:

`npm start`

## ChartGPT Input

### Main structure

```
Create a React component with a select based on the variable locations. If you select a location it finds the three closest plantations from the variable plantations, based on distance and displays the id, projectName and the distance in km in a list.

Also provide a search field that filters the locations based on name.

var locations = [
    {
        "name": "Neu-Ulm",
        "latitude": 48.4,
        "longitude": 10.0167
    },
 ]

var plantations = [
  {
    id: 4,
    type: 'CNT',
    projectName: 'Bäume pflanzen im Kottenforst',
    status: 'planted',
    forestOwnership: 'public',
    forestOwner: 'Nordrhein-Westfalen',
    treeQuantity: 180,
    location: 'Kottenforst bei Bonn',
    coordinatesUrl: 'https://goo.gl/maps/2TjYv8vgP4tMmNBG7',
    latitude: '50.671306',
    longitude: '7.049528',
    startId: 832,
    endId: 1011,
    startDate: "Frühjahr '22",
    comment: '',
    area: 'Bonn',
  },
]
```

### Filter based on distance

```
Given the following array of objects

[
 { id: 28, projectName: "Pflanzung mit Jugendlichen im Holter Wald", distance: 449.0427279465062 }
 { id: 29, projectName: "Pflanzung mit Jugendlichen im Holter Wald", distance: 449.0427279465062 }
]
​
create a javascript function which filters out all duplicates based on distance
```

### Distance calcuation

```
Create a javascript function which calculates the distance in km between two points defined bat latidude and longitude. The Results should be an integer.
```

### Findings

- Output differs a lot based on slight wording changes and previous executions
- Code was not bug free, but overall helpfull, but I can't say if it is faster then doing it without
- definitively helps with the creation of specialized functions, eg the lat/long distance calculations
- but you can't be sure the the functions works correctly -> a lot of (automatic) tests needed

But overall a very interesting piece of technology!
