import { describe, it, expect, beforeEach } from "vitest";
import { findById } from "./arrayUtils";

interface Product {
    id: number;
    name: string;
    price: number;
}

describe("findById", () => {

    let products: Product[];

    beforeEach(() => {

         products = [
            { id: 1, name: "Laptop", price: 800 },
            { id: 2, name: "Monitor", price: 250 },
            { id: 3, name: "Keyboard", price: 50 }
        ];

    });

    it("should return the item with the matching id", () => {

        // Act
        const result = findById(products, 2);

        // Assert
        expect(result).toEqual(products[1]);

    });

    it("should return undefined when the id does not exist", () => {

        // Act
        const result = findById(products, 99);

        // Assert
        expect(result).toBeUndefined();

    });

    it("should return undefined when the array is empty", () => {

        // Arrange
        const products: Product[] = [];

        // Act
        const result = findById(products, 1);

        // Assert
        expect(result).toBeUndefined();

    });

});



/*

describe("findById", () => {

    it("should return the item with the matching id", () => {

        // Arrange
        const products = [
            { id: 1, name: "Laptop", price: 800 },
            { id: 2, name: "Monitor", price: 250 },
            { id: 3, name: "Keyboard", price: 50 }
        ];

        // Act
        const result = findById(products, 2);

        // Assert
        expect(result).toEqual(products[1]);

    });

    it("should return undefined when the id does not exist", () => {

        // Arrange
        const products = [
            { id: 1, name: "Laptop", price: 800 },
            { id: 2, name: "Monitor", price: 250 },
            { id: 3, name: "Keyboard", price: 50 }
        ];

        // Act
        const result = findById(products, 99);

        // Assert
        expect(result).toBeUndefined();

    });

    it("should return undefined when the array is empty", () => {

        // Arrange
        const products: Product[] = [];

        // Act
        const result = findById(products, 1);

        // Assert
        expect(result).toBeUndefined();

    });

});
*/