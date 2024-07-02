package com.ict.extravel.domain.currency.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCurrency is a Querydsl query type for Currency
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCurrency extends EntityPathBase<Currency> {

    private static final long serialVersionUID = -173405271L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCurrency currency = new QCurrency("currency");

    public final StringPath currencyCode = createString("currencyCode");

    public final StringPath currencyKorean = createString("currencyKorean");

    public final StringPath currencySymbol = createString("currencySymbol");

    public final com.ict.extravel.domain.nation.entity.QNation nationCode;

    public QCurrency(String variable) {
        this(Currency.class, forVariable(variable), INITS);
    }

    public QCurrency(Path<? extends Currency> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCurrency(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCurrency(PathMetadata metadata, PathInits inits) {
        this(Currency.class, metadata, inits);
    }

    public QCurrency(Class<? extends Currency> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.nationCode = inits.isInitialized("nationCode") ? new com.ict.extravel.domain.nation.entity.QNation(forProperty("nationCode")) : null;
    }

}

