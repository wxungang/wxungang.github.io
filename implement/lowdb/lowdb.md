# lowdb
> Small JSON database for Node, Electron and the browser. Powered by Lodash. ⚡

## adapter
- 逻辑比较简单。 就是负责io操作，读写文件
- 数据对象 的序列化处理已经在写入前 的逻辑中处理好了。

```js
// Same code as in FileAsync, minus `await`
class FileSync extends Base {
  read() {
    // fs.exists is deprecated but not fs.existsSync
    if (fs.existsSync(this.source)) {
      // Read database
      try {
        const data = readFile(this.source, 'utf-8').trim()
        // Handle blank file
        return data ? this.deserialize(data) : this.defaultValue
      } catch (e) {
        if (e instanceof SyntaxError) {
          e.message = `Malformed JSON in file: ${this.source}\n${e.message}`
        }
        throw e
      }
    } else {
      // Initialize
      writeFile(this.source, this.serialize(this.defaultValue))
      return this.defaultValue
    }
  }
  // 外层已经序列化好了数据
  write(data) {
    return writeFile(this.source, this.serialize(data))
  }
}

module.exports = FileSync
```

## main 

