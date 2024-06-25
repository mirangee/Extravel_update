package com.ict.extravel.domain.monthexchage.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMonthlyPastExchangeRate is a Querydsl query type for MonthlyPastExchangeRate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMonthlyPastExchangeRate extends EntityPathBase<MonthlyPastExchangeRate> {

    private static final long serialVersionUID = -344108652L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMonthlyPastExchangeRate monthlyPastExchangeRate = new QMonthlyPastExchangeRate("monthlyPastExchangeRate");

    public final NumberPath<java.math.BigDecimal> averageExchangeRate = createNumber("averageExchangeRate", java.math.BigDecimal.class);

    public final com.ict.extravel.domain.currency.entity.QCurrency currencyCode;

    public final DatePath<java.time.LocalDate> endDate = createDate("endDate", java.time.LocalDate.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final com.ict.extravel.domain.nation.entity.QNation nationCode;

    public final DatePath<java.time.LocalDate> startDate = createDate("startDate", java.time.LocalDate.class);

    public QMonthlyPastExchangeRate(String variable) {
        this(MonthlyPastExchangeRate.class, forVariable(variable), INITS);
    }

    public QMonthlyPastExchangeRate(Path<? extends MonthlyPastExchangeRate> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMonthlyPastExchangeRate(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMonthlyPastExchangeRate(PathMetadata metadata, PathInits inits) {
        this(MonthlyPastExchangeRate.class, metadata, inits);
    }

    public QMonthlyPastExchangeRate(Class<? extends MonthlyPastExchangeRate> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.currencyCode = inits.isInitialized("currencyCode") ? new com.ict.extravel.domain.currency.entity.QCurrency(forProperty("currencyCode"), inits.get("currencyCode")) : null;
        this.nationCode = inits.isInitialized("nationCode") ? new com.ict.extravel.domain.nation.entity.QNation(forProperty("nationCode")) : null;
    }

}

