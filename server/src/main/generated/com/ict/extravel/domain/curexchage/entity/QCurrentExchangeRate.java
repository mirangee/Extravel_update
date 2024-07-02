package com.ict.extravel.domain.curexchage.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCurrentExchangeRate is a Querydsl query type for CurrentExchangeRate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCurrentExchangeRate extends EntityPathBase<CurrentExchangeRate> {

    private static final long serialVersionUID = -271416178L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCurrentExchangeRate currentExchangeRate = new QCurrentExchangeRate("currentExchangeRate");

    public final com.ict.extravel.domain.currency.entity.QCurrency currencyCode;

    public final NumberPath<java.math.BigDecimal> exchangeRateValue = createNumber("exchangeRateValue", java.math.BigDecimal.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final com.ict.extravel.domain.nation.entity.QNation nationCode;

    public final NumberPath<java.math.BigDecimal> preExchangeRateValue = createNumber("preExchangeRateValue", java.math.BigDecimal.class);

    public final DatePath<java.time.LocalDate> updateDate = createDate("updateDate", java.time.LocalDate.class);

    public QCurrentExchangeRate(String variable) {
        this(CurrentExchangeRate.class, forVariable(variable), INITS);
    }

    public QCurrentExchangeRate(Path<? extends CurrentExchangeRate> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCurrentExchangeRate(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCurrentExchangeRate(PathMetadata metadata, PathInits inits) {
        this(CurrentExchangeRate.class, metadata, inits);
    }

    public QCurrentExchangeRate(Class<? extends CurrentExchangeRate> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.currencyCode = inits.isInitialized("currencyCode") ? new com.ict.extravel.domain.currency.entity.QCurrency(forProperty("currencyCode"), inits.get("currencyCode")) : null;
        this.nationCode = inits.isInitialized("nationCode") ? new com.ict.extravel.domain.nation.entity.QNation(forProperty("nationCode")) : null;
    }

}

