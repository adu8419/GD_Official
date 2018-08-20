var React = require('react');
var _ = require('underscore');
require('./table.scss');
class GoMeTable extends React.Component {
  renderHtml(){
    var { children, data, colClick} = this.props;
    var tableHtml = {tableHeader:[],tableBody:[]};
    /*ɸѡrowHeader��row*/
    var rowHead = _.filter(children,function(obj) {
      return ( obj.props.rowHeader )
    });
    children = _.filter(children,function(obj) {
      return ( !obj.props.rowHeader )
    });
    /*tableͷ*/
    tableHtml.tableHeader.push(
        <tr key={_.uniqueId('thtr_')}>
          {children.map((column)=> {

            var { header, onHeaderChange, data, colKey } = column.props;
            var Header = header;
            if (React.isValidElement(header)) {
                if (colKey == 'INDEX') {
                    return (<th key={_.uniqueId('th_')} className="idx" nowrap="nowrap">{header}</th>);
                }
              return (<th key={_.uniqueId('th_')} nowrap="nowrap">{header}</th>);
            }


            return (<th key={_.uniqueId('th_')} nowrap="nowrap"><Header onChange={onHeaderChange} data={data}/></th>);
          })}
        </tr>
    );
    /*tableBody*/
    {data && data.map((item,rowIndex) => {
      var flag = !(rowIndex % 2 === 0);
      if(rowHead[0] && rowHead[0].props.children){//�����rowHeader��ȾrowHeader
        var rowHeadChild = rowHead[0].props.children;
        tableHtml.tableBody.push(
            <tr className="row-margin" key={_.uniqueId('rh_margin')}>
              <td colSpan="100"></td>
            </tr>
        );
        tableHtml.tableBody.push(
            <tr className="rowHeader" key={_.uniqueId('rh_')}>
              {rowHeadChild.map((column, index)=> {
                    var { cell, colKey, onClick,className, onCellChange,colSpan, ...others } = column.props;
                    var Cell = cell;
                    if (Cell) {
                      return (
                          <td key={_.uniqueId('tdrow_')} colSpan={colSpan}>
                            <Cell
                                {...others} data={item} onClick={onClick} colKey={colKey} index={rowIndex}
                                            onChange={(event) => {onCellChange(event, item,rowIndex);}} />
                          </td>);
                    }
                    if (colKey == 'INDEX') {
                      return (<td key={_.uniqueId('tdrow_')} colSpan={colSpan}><span className={className?className:''}>{index + 1}</span></td>);
                    }
                    return (<td key={_.uniqueId('tdrow_')} colSpan={colSpan}><span className={className?className:''}>{item[colKey]}</span></td>);
                  }
              )}
            </tr>
        )
      }
      tableHtml.tableBody.push(
          <tr key={_.uniqueId('tr_')} className={flag ? "" : ""} onClick={colClick && colClick.bind(this, item)}>
            {children.map((column, index)=> {
                  var { cell, colKey, onClick,className, onCellChange, ...others } = column.props;
                  var Cell = cell;
                  if (Cell) {
                    return (
                        <td key={_.uniqueId('td_')}>
                          <Cell
                              {...others} data={item} onClick={onClick} colKey={colKey} index={rowIndex}
                                          onChange={(event) => {onCellChange(event, item,rowIndex);}} />
                        </td>);
                  }
                  if (colKey == 'INDEX') {
                    return (<td key={_.uniqueId('td_')} ><span className={className?className:''}>{rowIndex + 1}</span></td>);
                  }
                  return (<td key={_.uniqueId('td_')}><span className={className?className:''}>{item[colKey]}</span></td>);
                }
            )}
          </tr>
      );
    })}
    return tableHtml;
  }
  render() {
    var {className, left} = this.props;
    var tableHtml = this.renderHtml();
    return (<div className="gome-table-mod">
        <table className={className + ' tab-nomral'}  cellPadding="0" cellSpacing="0">
          <thead >
          {tableHtml.tableHeader}
          </thead>
          <tbody>
          {tableHtml.tableBody}
          </tbody>
        </table>
    </div>);
  }
}

GoMeTable.Column = (props) => {
    return null;
};
export default GoMeTable;