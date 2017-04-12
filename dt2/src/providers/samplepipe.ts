import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'togametypekey' })
export class ToGameTypeKey implements PipeTransform {
  transform(value: number, args: any): string {
    if (typeof (value) !== 'number') {
      throw 'keysPipe value must be number';
    }

    return 's' + value.toString();
  }


}

@Pipe({ name: 'togametypename' })
export class ToGameTypeName implements PipeTransform {
  transform(value: number, args: any): string {
    if (typeof (value) !== 'number') {
      throw 'keysPipe value must be number';
    }

    if(0===value){
      return "正在审核的活动";
    } else if(1===value){
      return "已经拒绝的活动";
    } else if(2===value){
      return "准备开始的活动";
    } else if(3===value){
      return "已经开始的活动";
    } else if(4===value){
      return "已经取消的活动";
    } else if(5===value){
      return "已经完成的活动";
    }

    return "未知状态的活动"
  }


}


@Pipe({ name: 'togametypenamesex' })
export class ToGameTypeNameSex implements PipeTransform {
  transform(value: number, args: any): string {
    if (typeof (value) !== 'number') {
      throw 'keysPipe value must be number';
    }

    if(0===value){
      return "未知性别";
    } else if(1===value){
      return "男";
    } else if(2===value){
      return "女";
    }

    return "未知性别"
  }


}

//TODO 判断活动状态颜色条
@Pipe({ name: 'timinggametypekey' })
export class TimingGameTypeKey implements PipeTransform {
  transform(value: number, args: any): string {
    if (typeof (value) !== 'number') {
      throw 'keysPipe value must be number';
    }
    return 's' + value.toString();
  }


}
//TODO 截取bannar前五个
@Pipe({ name: 'bannarhomepage' })
export class Bannar implements PipeTransform {
  transform(value: any, args: any): any {
    if (typeof (value) !== 'object') {
      throw 'keysPipe value must be object';
    }

    value=value.slice(0,5);

    return value;
  }


}
//TODO 判断活动状态
@Pipe({ name: 'timinggametypename' })
export class TimingGameTypeName implements PipeTransform {
  transform(value: number, args: any): string {
    if (typeof (value) !== 'number') {
      throw 'keysPipe value must be number';
    }
    if(0===value){
      return "正在审核的活动";
    } else if(1===value){
      return "已经拒绝的活动";
    } else if(2===value){
      return "开始的活动";
    } else if(3===value){
      return "关闭的活动";
    } else if(4===value){
      return "完成的活动";
    }

    return "未知状态的活动"
  }
}
