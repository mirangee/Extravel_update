import React from 'react';
import styles from '../../../scss/CustomTooltip.module.scss';

const CustomTooltip = ({ active, payload, curRate }) => {
  if (active && payload && payload.length) {
    const {
      currencySymbol,
      startDate,
      endDate,
      calDate,
      averRate,
    } = payload[0].payload;
    const date = `${startDate.replaceAll('-', '/')}~${endDate.replaceAll('-', '/')} (${calDate})`;
    const rate = `평균 환율 : ${currencySymbol}${averRate}`;
    const diffRate = curRate - averRate;
    let diff = '';
    const customStyles = {
      '--color': 'gray',
    };
    if (diffRate > 0) {
      diff = `▼ ${diffRate.toFixed(2)} `;
      customStyles['--color'] = 'blue';
    } else if (diffRate < 0) {
      diff = `▲ ${Math.abs(diffRate).toFixed(2)} `;
      customStyles['--color'] = 'red';
    } else {
      diff = '--';
    }

    return (
      <div className={styles.toolBox}>
        <div className={styles.tooltip}>
          <div className={styles.tooltipDate}>{date}</div>
          <div className={styles.tooltipRate}>{rate}</div>
          <div className={styles.diffBox}>
            <div>실시간 환율 보다</div>
            <div
              style={customStyles}
              className={styles.diff}
            >
              {diff}
            </div>
            <div>만큼 차이나요.</div>
          </div>
        </div>
      </div>
    );
  }
};

export default CustomTooltip;
