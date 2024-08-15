"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const database_1 = require("./database");
// Promisify Pool Querys
database_1.pool.query = (0, util_1.promisify)(database_1.pool.query);
