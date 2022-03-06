// ts -> .d.ts 翻译文件 -> js
import superagent from 'superagent'
import fs from 'fs'
import path from 'path'

// Analyzer的类型接口定义必须写，但是export导出操作以及在analyzer类中implements的操作可以不写
export interface Analyzer {
  analyze: (html: string, filePath:string) => string;
}

class Crowller {

  private filePath = path.resolve(__dirname, '../../data/course.json') 

  // 获取页面内容
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  // 写入文件
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  // 使得以上的方法解耦
  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess()
  }
}

export default Crowller






