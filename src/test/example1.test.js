import { expect } from "chai";
describe("Math operations", () => {
  // trong đây sẽ chứa tất cả test case của bộ test này
  it("should add two integer", () => {
    const result = 10 + 20;

    // sử dụng lib chai để mock kết quả trả về từ function hoặc biến
    expect(result).to.equal(30);
  });

  it("Testing with array", () => {
    const arr = [1, 2, 3, 4, 5];
    // Kiểm tra xem phần từ này có trong mảng hay không
    expect(arr).to.include(5);
    // const sum = arr.reduce((acc, cur)=> acc + cur);
    // expect(sum).to.equal(15);
  });
});
