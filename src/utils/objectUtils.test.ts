import { describe, it, expect, beforeEach } from "vitest";
import { getProperty } from "./objectUtils";

interface Product {
    id: number;
    name: string;
    price: number;
    available: boolean;
}

describe("getProperty", () => {

    let product: Product;

    beforeEach(() => {
        // Arrange
        // Tesztadatok létrehozása
        product = {
            id: 1,
            name: "Laptop",
            price: 800,
            available: true
        };
    });

    it("should return the id property", () => {
        // Act
        const result = getProperty(product,"id");

        // Assert
        expect(result).toBe(1);

    });

    it("should return the name property", () => {
                // Act
        const result = getProperty(product,"name");

        // Assert
        expect(result).toBe("Laptop");

    });

    it("should return the price property", () => {
                // Act
        const result = getProperty(product,"price");

        // Assert
        expect(result).toBe(800);

    });

    it("should return the available property", () => {
                // Act
        const result = getProperty(product,"available");

        // Assert
        expect(result).toBe(true);

    });

});