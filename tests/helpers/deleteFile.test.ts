import { deleteFile } from '../../src/helpers/deleteFile';
import fs from 'fs';

const fsMock = fs as jest.Mocked<typeof fs>;

jest.mock('fs', () => ({
  unlink: jest.fn(),
}));

describe('deleteFile helper', () => {
  const path = '/path/to/file.txt';

  it('should successfully delete a file', async () => {
    fsMock.unlink.mockImplementation((_, callback) => callback(null));

    await expect(deleteFile(path)).resolves.toBeUndefined();
    expect(fsMock.unlink).toHaveBeenCalledWith(path, expect.any(Function));
  });

  it('should throw an error if the file cannot be deleted', async () => {
    const error = new Error('Failed to delete file');
    fsMock.unlink.mockImplementation((_, callback) => callback(error));

    await expect(deleteFile(path)).rejects.toThrow(error);
    expect(fsMock.unlink).toHaveBeenCalledWith(path, expect.any(Function));
  });
});
