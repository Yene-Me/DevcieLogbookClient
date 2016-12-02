function helloWorld() {
    return "Hello world!";
}

describe("Hello world", function() {
    it("says hello", function() {
        expect(helloWorld()).toEqual("Hello world!");
    });
});