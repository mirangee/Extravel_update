package com.ict.extravel.domain.weekexchange.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWeeklyPastExchangeRate is a Querydsl query type for WeeklyPastExchangeRate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWeeklyPastExchangeRate extends EntityPathBase<WeeklyPastExchangeRate> {

    private static final long serialVersionUID = 549870996L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWeeklyPastExchangeRate weeklyPastExchangeRate = new QWeeklyPastExchangeRate("weeklyPastExchangeRate");

    public final NumberPath<java.math.BigDecimal> averageExchangeRate = createNumber("averageExchangeRate", java.math.BigDecimal.class);

    public final com.ict.extravel.domain.currency.entity.QCurrency currencyCode;

    public final DatePath<java.time.LocalDate> endDate = createDate("endDate", java.time.LocalDate.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final com.ict.extravel.domain.nation.entity.QNation nationCode;

    public final DatePath<java.time.LocalDate> startDate = createDate("startDate", java.time.LocalDate.class);

    public QWeeklyPastExchangeRate(String variable) {
        this(WeeklyPastExchangeRate.class, forVariable(variable), INITS);
    }

    public QWeeklyPastExchangeRate(Path<? extends WeeklyPastExchangeRate> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWeeklyPastExchangeRate(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWeeklyPastExchangeRate(PathMetadata metadata, PathInits inits) {
        this(WeeklyPastExchangeRate.class, metadata, inits);
    }

    public QWeeklyPastExchangeRate(Class<? extends WeeklyPastExchangeRate> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.currencyCode = inits.isInitialized("currencyCode") ? new com.ict.extravel.domain.currency.entity.QCurrency(forProperty("currencyCode"), inits.get("currencyCode")) : null;
        this.nationCode = inits.isInitialized("nationCode") ? new com.ict.extravel.domain.nation.entity.QNation(forProperty("nationCode")) : null;
    }

}

