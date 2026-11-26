import { describe, it, expect } from "vitest";
import { 
    isApplicationStatus,
    isObject,
    isJobApplication 
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