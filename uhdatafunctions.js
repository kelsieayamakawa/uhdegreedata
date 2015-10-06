/**
 * Analytics for UH Data sets.
 * Created by Kelsie on 9/28/2015.
 */

/* globals _, uhdata */
/* exported testdata, percentageHawaiian, totalDegreesByYear, listCampuses */
/* exported listCampusDegrees, maxDegrees, doctoralDegreePrograms */

/**
 * Provides a small set of records from the UH data set.
 * @type {string}
 */
var testdata = uhdata.slice(0, 2).concat(_.find(uhdata, isHawaiian));

// total(Degrees(data). Returns total number of degrees awarded in data set
// 1. Reduce data set by accumulating the number of awards.

/**
 * Reduction function for accumulating the number of degrees.
 * @param memo The accumulator.
 * @param record The UH Data record from which award numbers will be extracted.
 * @returns The total of the accumulator and the awards in this record.
 */
function addDegrees(memo, record) {
  return memo + record["AWARDS"];
}

/**
 * Returns the total number of degrees in this data set.
 * @param data The UH data set.
 * @returns The total number of degrees.
 */
function totalDegrees(data) {
  return _.reduce(data, addDegrees, 0);
}

// percentageHawaiian(data). Returns the percentage of degrees that were awarded to students of
// Hawaiian Legacy in the data set.
// 1. Filter data set to those records where HAWAIIAN_LEGACY === "HAWAIIAN".
// 2. Reduce that data set to find total number of Hawaiian degrees.
// 3. Divide (2) by total number of degrees to get percentage.

/**
 * Predicate function returning true if the passed record concerns those of Hawaiian ancestry.
 * @param record The UH data set record.
 * @returns True if concerns Hawaiian ancestry.
 */
function isHawaiian(record) {
  return record ["HAWAIIAN_LEGACY"] === "HAWAIIAN";
}

/**
 * Filters data set to those records concerning Hawaiian ancestry.
 * @param data The UH data set.
 * @returns An array of records of those with Hawaiian ancestry.
 */
function hawaiianLegacy(data) {
  return _.filter(data, isHawaiian);
}

/**
 * Returns the total number of degrees awarded to those of Hawaiian ancestry in data.
 * @param data The UH data set.
 * @returns Total number of degrees awarded to those of Hawaiian ancestry.
 */
function totalHawaiianLegacy(data) {
  return _.reduce(hawaiianLegacy(data), addDegrees, 0);
}

/**
 * Returns the percentage of degrees awarded to those of Hawaiian ancestry in data.
 * @param data The UH data set.
 * @returns Percentage degrees to Hawaiians.
 */
function percentageHawaiian(data) {
  return (totalHawaiianLegacy(data) / totalDegrees(data)) * 100;
}

// totalDegreesByYear(data, year). Returns the total number of degrees awarded in the passed year.
// 1. Filter the data set to those records from the passed year.
// 2. Reduce to find the total number of degrees.

/**
 * Returns a predicate function that returns true if the passed record is from the given year.
 * @param year The year of interest.
 * @returns A function that returns true if the record is from the year.
 */
function makeYearFilter(year) {
  return function (record) {
    return record["FISCAL_YEAR"] === year;
  };
}

/**
 * Filters the data set to those records from the passed year.
 * @param data The UH data set.
 * @param year The year of interest as an integer.
 * @returns The array of records from the given year.
 */
function dataForYear(data, year) {
  return _.filter(data, makeYearFilter(year));
}

/**
 * Returns the total number of degrees awarded in the given year.
 * @param data The UH data set.
 * @param year The year of interest.
 * @returns The total degrees for that year.
 */
function totalDegreesByYear(data, year) {
  return _.reduce(dataForYear(data, year), addDegrees, 0);
}

// listCampuses(data). Returns an array containing all the campuses referenced in the passed data set.
// 1. Pluck the "CAMPUS" value into an array.
// 2. Remove duplicates using unique().

/**
 * Returns the campuses in the passed data set.
 * @param data The UH data set.
 * @returns An array of strings, one for each campus in the data set.
 */
function listCampuses(data) {
  return _.unique(_.pluck(data, "CAMPUS"));
}

// listCampusDegrees(data). Returns an object where the property keys are campuses and the values are the number of degrees awarded by the campus.
// 1. Group all of the records by campus (property keys are campuses, values are an array of records
// 2. Reduce the array of records to total number of degrees

/**
 * Groups the data set by campus.
 * @param data The UH data set.
 * @returns An object that groups the data set records by campus.
 */
function groupByCampus(data) {
  return _.groupBy(data, "CAMPUS");
}

/**
 * Returns an object of key/value keys. Keys are campuses, values are the number of degrees at that campus.
 * @param data The UH data set.
 * @returns The degrees per campus.
 */
function listCampusDegrees(data) {
  return _.mapObject(groupByCampus(data),
      function (val) {
        return _.reduce(val, addDegrees, 0);
      });
}

// maxDegrees(data). Returns an integer indicating the maximum number of degrees awarded in a year.
// 1. Group all records by year.
// 2. Reduce to get object with years as key and number degrees as value.
// 3. Get the max.

/**
 * Groups the data set by year.
 * @param data The UH data set.
 * @returns An object grouping the records in the data set by year.
 */
function groupByYear(data) {
  return _.groupBy(data, "FISCAL_YEAR");
}

/**
 * Returns the maximum number of degrees awarded in a single year in the data set.
 * @param data The UH data set.
 * @returns The maximum number of degrees.
 */
function maxDegrees(data) {
  return _.max(_.mapObject(groupByYear(data),
      function (val) {
        return _.reduce(val, addDegrees, 0);
      }));
}

// doctoralDegreePrograms(data). Returns a list of the degree programs (“CIP_DESC”) for which a doctoral degree is granted.
// 1. Filter data set to those records where OUTCOME === "Doctoral Degrees"
// 2. Pluck the CIP_DESC value of those records.
// 3. Remove duplicates using unique

/**
 * Predicate function indicating if the passed record concerns a doctoral degree.
 * @param record The record of interest.
 * @returns True if concerns a doctoral degree.
 */
function isDoctoralDegree(record) {
  return record["OUTCOME"] === "Doctoral Degrees";
}

/**
 * Filters the data into those that concern a doctoral degree.
 * @param data The UH data set.
 * @returns An array of records concerning a doctoral degree.
 */
function doctoralList(data) {
  return _.filter(data, isDoctoralDegree);
}

/**
 * Returns the list of programs with a doctoral degree.
 * @param data The UH data set.
 * @returns A list of strings, one per program with a doctoral degree.
 */
function doctoralDegreePrograms(data) {
  return _.unique(_.pluck(doctoralList(data), "CIP_DESC"));
}
