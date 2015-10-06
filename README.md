# Overview

Provides seven functions with computing analytics over the [Hawaii Open Dataset for UH Degree Data] (https://data.hawaii.gov/Formal-Education/University-Of-Hawaii-Degrees-Awarded-By-Major-CIP-/7bfs-svqv).

# Installation

Provide the following scripts in your html file:

```
<script src="//philipmjohnson.github.io/ics314f15/morea/underscore/underscore-min.js"></script>
<script src="//philipmjohnson.github.io/ics314f15/morea/underscore/uhdata.js"></script>
<script src="uhdatafunctions.js"></script>
```

# Usage

Here are example calls to the analytic functions:

```
<script>
  console.log("Total Degrees", totalDegrees(uhdata));
  console.log("Percentage Hawaiian", percentageHawaiian(uhdata));
  console.log("Total Degrees By Year", totalDegreesByYear(uhdata, 2012));
  console.log("List Campuses", listCampuses(uhdata));
  console.log("List Campus Degrees", listCampusDegrees(uhdata));
  console.log("Max Degrees", maxDegrees(uhdata));
  console.log("Doctoral Degree Programs", doctoralDegreePrograms(uhdata));
</script>
```

Consult the uhdatafunctions.js file for more details on these functions.

# Credits

Uses the [Underscore](http://underscorejs.org) library.