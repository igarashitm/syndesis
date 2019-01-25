/*
 * Copyright (C) 2016 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.syndesis.connector.odata.customizer.json;

import java.io.IOException;
import java.util.Iterator;
import org.apache.olingo.client.api.domain.ClientComplexValue;
import org.apache.olingo.client.api.domain.ClientProperty;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import io.syndesis.common.util.StringConstants;

public class ClientComplexValueSerializer
    extends StdSerializer<ClientComplexValue> implements StringConstants {

    private static final long serialVersionUID = 1L;

    private ObjectMapper objectMapper;

    public ClientComplexValueSerializer(ObjectMapper objectMapper) {
        this((Class<ClientComplexValue>) null);
        this.objectMapper = objectMapper;
    }

    public ClientComplexValueSerializer(Class<ClientComplexValue> t) {
        super(t);
    }

    @Override
    public Class<ClientComplexValue> handledType() {
        return ClientComplexValue.class;
    }

    @Override
    public void serialize(ClientComplexValue value, JsonGenerator generator, SerializerProvider provider) throws IOException {
        generator.writeStartArray();

        Iterator<?> iterator = value.iterator();
        while (iterator.hasNext()) {
            Object element = iterator.next();
            if (element instanceof ClientProperty) {
                ClientProperty property = (ClientProperty) element;
                String propertyName = property.getName();
                String propertyValue = objectMapper.writeValueAsString(property);

                StringBuilder builder = new StringBuilder();
                builder
                    .append(OPEN_BRACE)
                    .append(propertyName)
                    .append(COLON)
                    .append(propertyValue)
                    .append(CLOSE_BRACE);

                generator.writeString(builder.toString());
            }
        }

        generator.writeEndArray();
    }
}
