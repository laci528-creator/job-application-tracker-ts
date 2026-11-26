import { describe, it, expect } from "vitest";
import { 
    isApplicationStatus,
    isObject,
    isJobApplication,
    isArrayOf, 
    isJobApplicationArray 
} from "./validation";
import type { JobApplication } from "../types/JobApplication";

describe("isApplicationStatus", () => {

    it.each(["applied", "interview", "rejected", "offer"])(
        "should return true for valid status: %s",
        (value) => {

            // Act
            const result = isApplicationStatus(value);

            // Assert
            expect(result).toBe(true);

        }
    );

    it.each(["pending", ""])(
        "should return false for invalid status: %s",
        (value) => {

            // Act
            const result = isApplicationStatus(value);

            // Assert
            expect(result).toBe(false);

        }
    );

    it.each([123, null, undefined])(
        "should return false for non-string value: %s",
        (value) => {

            // Act
            const result = isApplicationStatus(value);

            // Assert
            expect(result).toBe(false);

        }
    );
});

describe("isObject", () => {

    it.each([
        [{}, true],
        [{ id: 1 }, true],
        [{ name: "Laptop" }, true],
        [null, false],
        [undefined, false],
        [[], false],
        [[1, 2, 3], false],
        ["Laptop", false],
        [123, false],
        [true, false],
    ])(
        "should validate %j and return %s",
        (value, expected) => {

            const result = isObject(value);

            expect(result).toBe(expected);

        }
    );
});


describe("isJobApplication", () => {

    const validApplication: JobApplication = {
        id: 1,
        company: "Company A",
        position: "Frontend Developer",
        status: "applied",
        notes: "Junior position"
    };

    it.each([
        [validApplication, true],
        [{ ...validApplication, notes: null }, true],
        [{ ...validApplication, notes: undefined }, true],
        [{ ...validApplication, id: "1" }, false],
        [{ ...validApplication, company: 123 }, false],
        [{ ...validApplication, position: null }, false],
        [{ ...validApplication, status: "pending" }, false],
        [{ ...validApplication, notes: 123 }, false],
        [{} , false],
        [null , false],
        [ [] , false],

    ])(
        "should validate %j and return %s",
        (value, expected) => {

            const result = isJobApplication(value);

            expect(result).toBe(expected);
        }
    );

});

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

function isString(value: unknown): value is string {
    return typeof value === "string";
}

describe("isArrayOf", () => {

    it.each([
        [[1, 2, 3], true],
        [[10], true],
        [[],true],
        [[1,"hello",3], false],
        [["1","3"], false],
        [[1,null], false],
        [null, false],
        [undefined, false],
        [{}, false],
        [123, false],

    ])(
        "should validate number array %j and return %s",
        (value, expected) => {

            const result = isArrayOf(value,isNumber);

            expect(result).toBe(expected);

        }
    );

        it.each([
        [["Laptop", "Monitor"], true],
        [["hello"], true],
        [[""],true],
        [[], true],
        [["hello", 123], false],
        [[1,2,3], false],
        [["hello", null], false],
        ["hello", false],
        [null, false],
        [undefined, false],

    ])(
        "should validate string array %j and return %s",
        (value, expected) => {

            const result = isArrayOf(value,isString);

            expect(result).toBe(expected);

        }
    );
});


describe("isJobApplicationArray", () => {

    const validApplication: JobApplication = {
        id: 1,
        company: "Company A",
        position: "Frontend Developer",
        status: "applied",
        notes: "Junior position"
    };

    const secondValidApplication: JobApplication = {
        id: 2,
        company: "Company B",
        position: "Backend Developer",
        status: "applied",
        notes: "midLevel position"
    };

    it.each([
        [[validApplication], true],
        [[validApplication,        
            secondValidApplication], true],
        [[], true],
        [[{...validApplication,status:"pending"}], false ],
        [[
            validApplication,
            { ...secondValidApplication, id: "2" }
        ], false],
        [[{}], false],
        [[null], false],
        [null, false],
        [undefined, false],
        [secondValidApplication, false],

    ])(
        "should validate application array %j and return %s",
        (value, expected) => {

            const result = isJobApplicationArray(value);

            expect(result).toBe(expected);

        }
    );

});






